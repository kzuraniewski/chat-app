import { TRPCError, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import logger from './lib/logger';
import { getJwtPayloadFromAuthHeader } from './utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createContext = async ({
	req,
	res,
}: CreateExpressContextOptions) => {
	const jwt = getJwtPayloadFromAuthHeader(req.headers.authorization);

	return {
		jwt,
		prisma,
	};
};
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

const isAuthorised = t.middleware((opts) => {
	const { jwt } = opts.ctx;

	if (!jwt) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}

	return opts.next();
});

const log = t.middleware(async (opts) => {
	const start = Date.now();

	const result = await opts.next();

	const duration = Date.now() - start;
	const { path, type, rawInput } = opts;

	if (result.ok) {
		logger.info(
			{
				path,
				type,
				rawInput,
				duration,
			},
			'Procedure called successfully'
		);
	} else {
		logger.error(
			{
				path,
				type,
				rawInput,
				duration,
				error: result.error,
			},
			'Procedure failed'
		);
	}

	return result;
});

export const router = t.router;

const baseProcedure = t.procedure.use(log);

export const publicProcedure = baseProcedure;
export const protectedProcedure = baseProcedure.use(isAuthorised);
