import { t } from '../trpc';
import auth from '../middleware/auth.middleware';
import log from '../middleware/log.middleware';
import protocol from '../middleware/protocol.middleware';

const httpProcedure = t.procedure
	.use(protocol('http'))
	.use(log);

export const publicProcedure = httpProcedure;
export const protectedProcedure = httpProcedure.use(auth);

export const wsProcedure = t.procedure
	.use(protocol('ws'))
	.use(auth);
