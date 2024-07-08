import { t } from '../trpc';
import loginProcedure from './login.procedure';
import registerProcedure from './register.procedure';
import userProcedure from './user.procedure';

export const appRouter = t.router({
	register: registerProcedure,
	login: loginProcedure,
	user: userProcedure,
});

export type AppRouter = typeof appRouter;
