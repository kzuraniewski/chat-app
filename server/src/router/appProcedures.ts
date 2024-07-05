import authMiddleware from '../middleware/auth.middleware';
import loggerMiddleware from '../middleware/logger.middleware';
import { t } from '../trpc';

const baseProcedure = t.procedure.use(loggerMiddleware);

export const publicProcedure = baseProcedure;
export const protectedProcedure = baseProcedure.use(authMiddleware);
