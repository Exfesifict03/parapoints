import { pgTable, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

const userRoles = ['admin', 'user', 'superadmin'] as const;
export type UserRole = (typeof userRoles)[number];
export const userRole = pgEnum('user_role', userRoles);

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	firstname: text('firstname').notNull(),
	middlename: text('middlename'),
	lastname: text('lastname').notNull(),
	email: text('email').notNull().unique(),
	userRole: userRole('role'),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const history = pgTable('history', {
	id: text('id').primaryKey(),
	amount: integer('amount').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull()
})

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
