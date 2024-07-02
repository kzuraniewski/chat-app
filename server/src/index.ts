import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { createContext } from './trpc';
import { appRouter } from './router';
import { connect } from './database/connection';
import config from './config';
import logger from './lib/logger';

const app = express();

app.use(cors());
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

app.listen(config.port, async () => {
	logger.info(`Server listening on port ${config.port}`);
	await connect();
});
