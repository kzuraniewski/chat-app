import { initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { getJwtPayloadFromAuthHeader } from './utils/auth';
import { prisma } from './prisma';

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
