import { t } from '../../trpc';
import conversationsRouter from './conversations/router';
import loginProcedure from './login.procedure';
import registerProcedure from './register.procedure';
import userProcedure from './user.procedure';

export const appRouter = t.router({
	register: registerProcedure,
	login: loginProcedure,
	user: userProcedure,

	conversations: conversationsRouter,
});

export type AppRouter = typeof appRouter;
