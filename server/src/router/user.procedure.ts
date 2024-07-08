import { TRPCError } from '@trpc/server';
import logger from '../lib/logger';
import { protectedProcedure } from './builders';

const userProcedure = protectedProcedure.query((opts) => {
	const { jwt, prisma } = opts.ctx;

	try {
		return prisma.user.findFirstOrThrow({
			where: { id: jwt.id },
		});
	} catch {
		logger.error(jwt, 'Cannot find user from JWT payload');
		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Failed to retrieve user data',
		});
	}
});

export default userProcedure;
