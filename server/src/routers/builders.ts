import { t } from '../trpc';
import authMiddleware from '../middleware/auth.middleware';
import loggerMiddleware from '../middleware/logger.middleware';
import protocolMiddleware from '../middleware/protocol.middleware';

const httpProcedure = t.procedure
	.use(protocolMiddleware('http'))
	.use(loggerMiddleware);

export const publicProcedure = httpProcedure;
export const protectedProcedure = httpProcedure.use(authMiddleware);

export const wsProcedure = t.procedure
	.use(protocolMiddleware('ws'))
	.use(authMiddleware);
