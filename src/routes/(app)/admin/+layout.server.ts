import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user || user.userRole !== 'admin') {
		throw redirect(302, '/login');
	}
	return {
		user: {
			role: user.userRole
		}
	};
};
