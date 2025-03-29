import { pgTable, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';


const userRoles = ['admin', 'user', 'superadmin'] as const;
export type UserRole = (typeof userRoles)[number];
export const userRole = pgEnum('user_role', userRoles);

const Statuses = ['unscan', 'scanned'] as const;
export type Status = (typeof Statuses)[number];
export const status = pgEnum('status', Statuses);

export const transactionType = pgEnum('transaction_type', ['fare_payment', 'points_transfer', 'cash_payout']);
export const transactionStatus = pgEnum('transaction_status', ['pending', 'completed', 'failed']);


export const user = pgTable('user', {
	id: text('id').primaryKey(),
	firstname: text('firstname').notNull(),
	middlename: text('middlename'),
	lastname: text('lastname').notNull(),
	email: text('email').notNull().unique(),
	userRole: userRole('role'),
	passwordHash: text('password_hash').notNull(),
	points: text('points').default('0'),
	joinedDate: timestamp("joined_date").defaultNow(),
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
	userId: text('user_id').notNull().references(() => user.id),
	amount: integer('amount').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull()
});
export const redeem = pgTable('redeem', {
	id: text('id').primaryKey(),
	points: integer('points').notNull(),
	status: status('status').notNull(),
});

export const points = pgTable('points', {
	id: text('id').primaryKey(),
	amount: integer('amount').notNull(),
	qrUrl: text('qr_url').notNull(),
	status: status('status').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const transactions = pgTable('transactions', {
    id: text('id').primaryKey(),
    senderId: text('sender_id').references(() => user.id, { onDelete: 'cascade' }),
    receiverId: text('receiver_id').references(() => user.id, { onDelete: 'cascade' }),
    amount: integer('amount').notNull(),
    type: transactionType('type').notNull(),
    status: transactionStatus('status').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});



export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Points = typeof points.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;

