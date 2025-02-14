import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema'; 
import { eq } from 'drizzle-orm';

/**
 * GET: Fetch user profile data
 */
export const GET: RequestHandler = async ({ locals }) => {
  try {
    const currentUser = locals.user;
    if (!currentUser) {
      return json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const userId = currentUser.id;
    if (!userId) {
      return json({ status: 'error', message: 'User ID is missing' }, { status: 401 });
    }

    // Fetch user details from database
    const userData = await db
      .select({
        id: user.id,
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.email,
        points: user.points,
        joinedDate: user.joinedDate,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!userData || userData.length === 0) {
      return json({ status: 'error', message: 'User not found' }, { status: 404 });
    }

    return json({ status: 'success', data: userData[0] }, { status: 200 });

  } catch (error) {
    console.error('GET /user Error:', error);
    return json({ status: 'error', message: 'Error fetching user data' }, { status: 500 });
  }
};

/**
 * POST: Update user profile data
 */
export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    console.log("Received update request");

    const currentUser = locals.user;
    if (!currentUser) {
      console.log("Unauthorized user");
      return json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const userId = currentUser.id;
    console.log("Updating user with ID:", userId);

    const body = await request.json();
    console.log("Received data:", body);

    const { firstname, middlename = "", lastname } = body;

    if (!firstname || !lastname) {
      console.log("Validation failed: Missing required fields");
      return json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    const updateResult = await db
      .update(user)
      .set({ firstname, middlename, lastname })
      .where(eq(user.id, userId))
      .execute();

    console.log("Database update result:", updateResult);

    return json({ status: 'success', message: 'User updated successfully' }, { status: 200 });

  } catch (error: unknown) {  // ✅ Better alternative
    if (error instanceof Error) {
      return json({ status: "error", message: error.message }, { status: 500 });
    }
    return json({ status: "error", message: "An unknown error occurred" }, { status: 500 });
  }
};
