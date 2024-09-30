import EventEmitter from 'events';
import { initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import cookie from 'cookie';

import { prisma } from '@/prisma';
import { getJwtPayload, JwtPayload } from '@/utils/auth';

const events = new EventEmitter();

type ContextBase = {
	prisma: typeof prisma;
	events: typeof events;
	jwt: JwtPayload | null;
};

export type ExpressContext = ContextBase & CreateExpressContextOptions;
export type WsContext = ContextBase & CreateWSSContextFnOptions;

export const createContext = ({
	req,
	res,
}: CreateExpressContextOptions | CreateWSSContextFnOptions) => {
	const cookies = req.headers.cookie
		? cookie.parse(req.headers.cookie)
		: null;
	const jwt = getJwtPayload(cookies?.['token']);

	return {
		prisma,
		events,
		req,
		res,
		jwt,
	} as ExpressContext | WsContext;
};

export const t = initTRPC.context<ExpressContext | WsContext>().create();
