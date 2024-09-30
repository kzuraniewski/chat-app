import { TRPCError } from '@trpc/server';

import { t } from '@/trpc';

const auth = t.middleware((opts) => {
	const { jwt } = opts.ctx;

	if (!jwt) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Missing JWT token',
		});
	}

	return opts.next({
		ctx: { jwt },
	});
});

export default auth;
