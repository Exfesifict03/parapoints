import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { redeem, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    // Check if user is authenticated
    const currentUser = locals.user;
    if (!currentUser) {
      throw redirect(302, '/login');
    }

    const userId = currentUser.id;
    if (!userId) {
      return json({ message: 'Unauthorized: User ID is missing', status: 'error' }, { status: 401 });
    }

    // Parse the QR Code data
    const { qr_code } = await request.json();
    if (!qr_code) {
      return json({ message: 'Missing required field: qr_code', status: 'error' }, { status: 400 });
    }

    let parsedQRCode;
    try {
      parsedQRCode = JSON.parse(qr_code);
    } catch {
      return json({ message: 'Invalid QR code format', status: 'error' }, { status: 400 });
    }

    const { uuid, points } = parsedQRCode;
    if (!uuid || typeof points !== 'number') {
      return json({ message: 'QR code does not contain valid data', status: 'error' }, { status: 400 });
    }

    // Check if the QR code already exists in redeem table
    const [pointRecord] = await db
      .select({ id: redeem.id, points: redeem.points, status: redeem.status })
      .from(redeem)
      .where(eq(redeem.id, uuid.trim()))
      .limit(1);

    // If it doesn't exist, insert a new record
    if (!pointRecord) {
      console.log("Inserting new QR code into redeem table:", { uuid, points });

      await db.insert(redeem)
        .values({ id: uuid.trim(), points, status: 'scanned' })
        .onConflictDoNothing(); // Prevents duplicate entry errors
    }

    // If already scanned, return an error
    if (pointRecord?.status === 'scanned') {
      return json({ message: 'This QR code has already been scanned', status: 'error' }, { status: 409 });
    }

    // Fetch user data to update points
    const [userRecord] = await db
      .select({ id: user.id, points: user.points })
      .from(user)
      .where(eq(user.id, userId.trim()))
      .limit(1);

    if (!userRecord) {
      return json({ message: 'User not found for the current session', status: 'error' }, { status: 404 });
    }

    // Convert user points to number and add QR code points
    const userCurrentPoints = Number(userRecord.points) || 0;
    const updatedPoints = userCurrentPoints + points;

    // Update user points in the database
    await db.update(user)
      .set({ points: updatedPoints })
      .where(eq(user.id, userRecord.id));

    // Mark the QR code as scanned in redeem table
    const [updatedRedeem] = await db
      .update(redeem)
      .set({ status: 'scanned' })
      .where(eq(redeem.id, uuid.trim()))
      .returning({ id: redeem.id, status: redeem.status });

    if (!updatedRedeem) {
      return json({ message: 'Failed to update redeem status', status: 'error' }, { status: 500 });
    }

    return json({
      message: 'QR Code scanned successfully',
      data: {
        user: { id: userRecord.id, updatedPoints },
        redeem: updatedRedeem,
      },
      status: 'success',
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ message: 'Error processing QR code scan', status: 'error' }, { status: 500 });
  }
};
