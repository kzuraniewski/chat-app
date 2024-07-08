import { initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { verifyToken } from './utils/auth';
import { prisma } from './prisma';

export const createContext = async ({
	req,
	res,
}: CreateExpressContextOptions) => {
	const jwt = verifyToken(req.cookies['token']);

	return {
		req,
		res,
		jwt,
		prisma,
	};
};
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();
