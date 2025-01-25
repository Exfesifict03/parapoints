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
      console.log('Registration attempt started');
      const form = await superValidate(event, zod(registerSchema));
      
      console.log('Form validation result:', {
        valid: form.valid,
        data: form.data
      });
  
      if (!form.valid) {
        console.log('Form validation errors:', form.errors);
        return fail(400, {form});
      }
  
      const { email, firstname, middlename, lastname, password } = form.data;
      
      try {
        console.log('Attempting user creation', { email, firstname });
        
        const hashedPassword = await hash(password, {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1
        });
  
        const userId = crypto.randomUUID();
        
        await db.insert(user).values({
          id: userId,
          email,
          firstname,
          middlename: middlename ?? '',
          lastname,
          passwordHash: hashedPassword,
          userRole: 'user'
        });
  
        console.log('User created successfully', { userId });
        return { form };
      } catch (e) {
        console.error('Registration error:', e);
        
        if (e instanceof postgres.PostgresError) {
          console.error('Postgres Error Details:', {
            code: e.code,
            constraintName: e.constraint_name
          });
          
          if (e.constraint_name === 'auth_user_email_unique') {
            return setError(form, 'email', 'Email already taken');
          }
        }
        
        return setError(form, '', 'Unable to create account');
      }
    }
  };