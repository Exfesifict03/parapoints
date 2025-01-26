import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
  try {
    const currentUser = locals.user;

    if (!currentUser) {
      return json(
        {
          message: 'Unauthorized: No logged-in user found',
          status: 'error',
        },
        { status: 401 }
      );
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

    // Fetch the user's points from the database
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
          message: 'User not found',
          status: 'error',
        },
        { status: 404 }
      );
    }

    // Return the user's points
    return json(
      {
        message: 'User points fetched successfully',
        data: {
          user: {
            id: userRecord.id,
            points: parseInt(userRecord.points ?? '0', 10),
          },
        },
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return json(
      {
        message: 'Error fetching user points',
        status: 'error',
      },
      { status: 500 }
    );
  }
};
