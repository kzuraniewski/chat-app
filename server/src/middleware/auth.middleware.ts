import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

const authMiddleware = t.middleware((opts) => {
	const { jwt } = opts.ctx;

	if (!jwt) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}

	return opts.next({
		ctx: { jwt },
	});
});

export default authMiddleware;
