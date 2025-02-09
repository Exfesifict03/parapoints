import * as auth from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { loginSchema } from '$lib/zod-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { verify } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
    // Ensure user is not redirected if they are already on their target page
    if (event.locals.user) {
        const userRole = event.locals.user.userRole;

        if (userRole === 'superadmin' && event.url.pathname !== '/superadmin/dashboard') {
            throw redirect(302, '/superadmin/dashboard');
        } else if (userRole === 'admin' && event.url.pathname !== '/admin/dashboard') {
            throw redirect(302, '/admin/dashboard');
        } else if (userRole === 'user' && event.url.pathname !== '/user/home') {
            throw redirect(302, '/user/home');
        }
    }

    return {
        loginForm: await superValidate(zod(loginSchema))
    };
};

export const actions: Actions = {
    login: async (event) => {
        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { email, password } = form.data;

        try {
            if (!email) {
                return setError(form, 'email', 'Email is required');
            }

            const existingUser = await db
                .select({
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    middlename: user.middlename,
                    lastname: user.lastname,
                    hashedPassword: user.passwordHash,
                    role: user.userRole
                })
                .from(user)
                .where(eq(user.email, email));

            if (!existingUser.length) {
                return setError(form, 'email', 'Email not found');
            }

            const userRecord = existingUser[0];
            const validPassword = await verify(userRecord.hashedPassword, password);

            if (!validPassword) {
                return setError(form, 'password', 'Incorrect password');
            }

            // Create session after successful login
            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, userRecord.id);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

            // Redirect based on role
            switch (userRecord.role) {
                case 'superadmin':
                    throw redirect(302, '/superadmin/dashboard');
                case 'admin':
                    throw redirect(302, '/admin/dashboard');
                case 'user':
                    throw redirect(302, '/user/home');
                default:
                    throw redirect(302, '/user/home'); // Default fallback
            }

        } catch (error) {
            if (error instanceof Error && !(error instanceof redirect)) {
                return setError(form, '', 'An unexpected error occurred');
            }
            throw error;
        }
    }
};
