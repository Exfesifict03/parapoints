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
    if (event.locals.user) {
        const role = event.locals.user.role;
        if (role === 'admin' || role === 'superadmin') {
            throw redirect(302, '/');
        } else if (role === 'user') {
            throw redirect(302, '/user/home');
        } else {
            throw redirect(302, '/login');
        }
    }
    return {
        loginForm: await superValidate(zod(loginSchema))
    };
};

export const actions: Actions = {
    login: async (event) => {
        const form = await superValidate(event, zod(loginSchema));
        console.log('Form validation result:', form);

        if (!form.valid) {
            console.log('Validation errors:', form.errors);
            return fail(400, { form });
        }

        const { email, password } = form.data;
        console.log('Validated form data:', form.data);

        try {
            if (!email) {
                return setError(form, 'email', 'Email is required');
            }

            const existingUser  = await db
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

            console.log('Existing user:', existingUser );
            if (!existingUser .length) {
                return setError(form, 'email', 'Email not found');
            }

            const userRecord = existingUser [0];
            const validPassword = await verify(userRecord.hashedPassword, password);
            if (!validPassword) {
                return setError(form, 'password', 'Incorrect password');
            }
            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, userRecord.id);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
            throw redirect(302, '/'); 
        } catch (error) {
            console.error('Login error:', error);
            return setError(form, '', 'An unexpected error occurred');
        }
    }
};