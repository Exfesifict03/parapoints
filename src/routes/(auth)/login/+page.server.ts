import * as auth from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { loginSchema } from '$lib/zod-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { verify } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    
    if (event.url.pathname === '/login' && event.locals.user) {
        const userRole = event.locals.user.userRole;
        
        if (userRole === 'admin' || userRole === 'superadmin') {
            throw redirect(302, '/');
        } else if (userRole === 'user') {
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

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, userRecord.id);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

            if (userRecord.role === 'admin' || userRecord.role === 'superadmin') {
                throw redirect(302, '/');
            } else if (userRecord.role === 'user') {
                throw redirect(302, '/user/home');
            } else {
                throw redirect(302, '/user/home');
            }

        } catch (error) {
            if (error instanceof Error && !(error instanceof redirect)) {
                return setError(form, '', 'An unexpected error occurred');
            }
            throw error;
        }
    }
};