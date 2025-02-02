import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { points, user, history } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid'; // Assuming UUID is used for generating the `history` ID

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const currentUser = locals.user;
    if (!currentUser) {
      throw redirect(302, '/login');
    }

    const userId = currentUser.id;
    if (!userId) {
      return json(
        {
          message: 'Unauthorized: User ID is missing',
          status: 'error',
        },
        { status: 401 }
      );
    }

    const { qr_code } = await request.json();
    if (!qr_code) {
      return json(
        {
          message: 'Missing required field: qr_code',
          status: 'error',
        },
        { status: 400 }
      );
    }

    let parsedQRCode;
    try {
      parsedQRCode = JSON.parse(qr_code);
    } catch {
      return json(
        {
          message: 'Invalid QR code format',
          status: 'error',
        },
        { status: 400 }
      );
    }

    const { id: pointId } = parsedQRCode; // Extract 'id' from QR code
    if (!pointId) {
      return json(
        {
          message: 'QR code does not contain a valid pointId',
          status: 'error',
        },
        { status: 400 }
      );
    }

    const [pointRecord] = await db
      .select({
        id: points.id,
        amount: points.amount,
        status: points.status,
      })
      .from(points)
      .where(eq(points.id, pointId.trim()))
      .limit(1);

    if (!pointRecord) {
      return json(
        {
          message: 'Point not found for the provided QR code',
          status: 'error',
        },
        { status: 404 }
      );
    }

    if (pointRecord.status === 'scanned') {
      return json(
        {
          message: 'This QR code has already been scanned',
          status: 'error',
        },
        { status: 409 }
      );
    }

    const [userRecord] = await db
      .select({
        id: user.id,
        points: user.points,
      })
      .from(user)
      .where(eq(user.id, userId.trim()))
      .limit(1);

    if (!userRecord) {
      return json(
        {
          message: 'User not found for the current session',
          status: 'error',
        },
        { status: 404 }
      );
    }

    const updatedPoints = parseInt(userRecord.points ?? '0') + pointRecord.amount;

    await db
      .update(user)
      .set({ points: updatedPoints.toString() })
      .where(eq(user.id, userRecord.id));

    const [updatedPoint] = await db
      .update(points)
      .set({ status: 'scanned' })
      .where(eq(points.id, pointRecord.id))
      .returning({
        id: points.id,
        status: points.status,
      });

    if (!updatedPoint) {
      return json(
        {
          message: 'Failed to update point status',
          status: 'error',
        },
        { status: 500 }
      );
    }
    const historyEntry = {
      id: uuidv4(),
      userId: userRecord.id,
      amount: pointRecord.amount,
      createdAt: new Date(),
    };

    await db.insert(history).values(historyEntry);

    return json(
      {
        message: 'QR Code scanned successfully',
        data: {
          user: { id: userRecord.id, updatedPoints },
          point: updatedPoint,
          history: historyEntry,
        },
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return json(
      {
        message: 'Error processing QR code scan',
        status: 'error',
      },
      { status: 500 }
    );
  }
};
