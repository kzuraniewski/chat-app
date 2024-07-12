import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import env from './utils/env';
import logger from './lib/logger';
import { appRouter } from './routers/app';
import { createContext } from './trpc';
import liveChatRouter from './routers/liveChat';

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
	})
);

app.listen(env.httpPort, () => {
	logger.info(`Server listening on port ${env.httpPort}`);
});

const wss = new WebSocketServer({ port: 4198 });

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
