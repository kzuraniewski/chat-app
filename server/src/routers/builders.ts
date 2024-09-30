import auth from '@/middleware/auth.middleware';
import log from '@/middleware/log.middleware';
import protocol from '@/middleware/protocol.middleware';
import { t } from '@/trpc';

// prettier-ignore
const httpProcedure = t.procedure
	.use(protocol('http'))
	.use(log);

export const publicProcedure = httpProcedure;
export const protectedProcedure = httpProcedure.use(auth);

// prettier-ignore
export const wsProcedure = t.procedure
	.use(protocol('ws'))
	.use(auth);
