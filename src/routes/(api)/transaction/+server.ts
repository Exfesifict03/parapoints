import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { history } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
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
    const userHistory = await db
      .select({
        id: history.id,
        amount: history.amount,
        createdAt: history.createdAt,
      })
      .from(history)
      .where(eq(history.userId, userId.trim()));

    return json(
      {
        message: 'History fetched successfully',
        data: userHistory,
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return json(
      {
        message: 'Error fetching user history',
        status: 'error',
      },
      { status: 500 }
    );
  }
};
