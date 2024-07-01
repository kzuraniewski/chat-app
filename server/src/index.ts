import express from 'express';
import { createContext } from './trpc';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';
import cors from 'cors';
import 'dotenv/config';
import './database/connection';

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

app.listen(process.env.PORT);
