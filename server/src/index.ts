import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { createContext } from './trpc';
import { appRouter } from './router';
import env from './utils/env';
import logger from './lib/logger';

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(
	'/',
	createExpressMiddleware({
		router: appRouter,
		createContext,
		batching: {
			enabled: true,
		},
	})
);

app.listen(env.port, async () => {
	logger.info(`Server listening on port ${env.port}`);
});
