import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema'; 
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

    // Fetch user details including joinedDate
    const userData = await db
      .select({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        points: user.points,
        joinedDate: user.joinedDate,  // Fetch joined_date
      })
      .from(user)
      .where(eq(user.id, userId.trim()))
      .limit(1);

    if (!userData || userData.length === 0) {
      return json({ message: 'User not found', status: 'error' }, { status: 404 });
    }

    return json({ message: 'User fetched', data: userData[0], status: 'success' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return json({ message: 'Error fetching user data', status: 'error' }, { status: 500 });
  }
};
