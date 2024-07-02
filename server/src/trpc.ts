import { TRPCError, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import config from './config';
import logger from './lib/logger';
import db from './database/connection';

export const createContext = async ({
	req,
	res,
}: CreateExpressContextOptions) => {
	const token = req.cookies.token;
	const user = token ? jwt.verify(token, config.jwtSecret) : null;

	return {
		user,
		db,
	};
};
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

const isAuthorised = t.middleware((opts) => {
	const { user } = opts.ctx;

	if (!user) {
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

	if (result.ok) {
		logger.info({
			path: opts.path,
			type: opts.type,
			duration,
		});
	} else {
		logger.error({
			path: opts.path,
			type: opts.type,
			duration,
			error: result.error,
		});
	}

	return result;
});

export const router = t.router;

const baseProcedure = t.procedure.use(log);

export const publicProcedure = baseProcedure;
export const protectedProcedure = baseProcedure.use(isAuthorised);
