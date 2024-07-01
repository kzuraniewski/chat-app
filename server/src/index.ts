import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { createContext } from './trpc';
import { appRouter } from './router';
import { connect } from './database/connection';

const app = express();

app.use(cors());

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

app.listen(process.env.PORT, async () => {
	await connect();
});
