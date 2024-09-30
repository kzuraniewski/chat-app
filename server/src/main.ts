import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import cors from 'cors';
import express from 'express';
import { WebSocketServer } from 'ws';

import logger from '@/lib/logger';
import { appRouter, liveChatRouter } from '@/routers';
import { createContext } from '@/trpc';
import env from '@/utils/env';

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(
	'/',
	createExpressMiddleware({
		router: appRouter,
		createContext: createContext,
		batching: {
			enabled: true,
		},
	}),
);

app.listen(env.httpPort, () => {
	logger.info(`Server listening on port ${env.httpPort}`);
});

const wss = new WebSocketServer({
	port: parseInt(env.wsPort),
});

const handler = applyWSSHandler({
	wss,
	router: liveChatRouter,
	createContext: createContext,
});

process.on('SIGTERM', () => {
	logger.info('Closing server');
	handler.broadcastReconnectNotification();
	wss.close();
});
