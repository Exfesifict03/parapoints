import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { points, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
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

      // Parse the QR code JSON string
      let parsedQRCode;
      try {
        parsedQRCode = JSON.parse(qr_code);
        console.log('Parsed QR Code:', parsedQRCode);
      } catch (parseError) {
        console.error('QR Code Parsing Error:', parseError);
        return json(
          {
            message: 'Invalid QR code format',
            status: 'error',
          },
          { status: 400 }
        );
      }

      const { id: pointId } = parsedQRCode;

      if (!pointId) {
        return json(
          {
            message: 'QR code does not contain a valid point ID',
            status: 'error',
          },
          { status: 400 }
        );
      }

      // Fetch the point record
      const [pointRecord] = await db
        .select({
          id: points.id,
          amount: points.amount,
          status: points.status,
        })
        .from(points)
        .where(eq(points.id, pointId))
        .limit(1);

      if (!pointRecord) {
        return json(
          {
            message: 'Point not found',
            status: 'error',
          },
          { status: 404 }
        );
      }

      // Check if the point has already been scanned
      if (pointRecord.status === 'scanned') {
        return json(
          {
            message: 'This point has already been scanned',
            status: 'error',
          },
          { status: 409 }
        );
      }

      // Fetch the user record
      const [userRecord] = await db
        .select({
          id: user.id,
          points: user.points,
        })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

      if (!userRecord) {
        return json(
          {
            message: 'User not found',
            status: 'error',
          },
          { status: 404 }
        );
      }

      // Calculate updated points
      const currentPoints = parseInt(userRecord.points ?? '0');
      const updatedPoints = currentPoints + pointRecord.amount;

      // Update user points
      await db
        .update(user)
        .set({ points: updatedPoints.toString() })
        .where(eq(user.id, userRecord.id));

      return json(
        {
          message: 'Points redeemed successfully',
          status: 'success',
          data: {
            pointsAdded: pointRecord.amount,
            totalPoints: updatedPoints,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('QR Scan Error:', error);
      return json(
        {
          message: 'Error processing QR code',
          status: 'error',
        },
        { status: 500 }
      );
    }
  },
};