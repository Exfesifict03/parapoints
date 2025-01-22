import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { registerSchema } from '$lib/zod-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db/index.js';
import postgres from 'postgres';
import { user } from '$lib/server/db/schema.js';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(registerSchema))  
    };
};

export const actions: Actions = {
    register: async (event) => {
        const form = await superValidate(event, zod(registerSchema));
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const { email, firstname, middlename, lastname, password } = form.data;
        const userId = crypto.randomUUID();

        try {
            const hashedPassword = await hash(password, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 1
            });

            const safeMiddlename = middlename ?? '';

            await db.insert(user).values({
                id: userId,
                email,
                firstname,
                middlename: safeMiddlename,
                lastname,
                passwordHash: hashedPassword,
                userRole: 'user'
            });

            return { form };
        } catch (e) {
            if (e instanceof postgres.PostgresError) {
                if (e.constraint_name === 'auth_user_email_unique') {
                    return setError(form, 'email', 'Email already taken');
                }
            }
            return setError(form, '', 'Unable to create account');
        }
    }
};