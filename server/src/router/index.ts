import { t } from '../trpc';
import loginProcedure from './login.procedure';
import registerProcedure from './register.procedure';

export const appRouter = t.router({
	register: registerProcedure,
	login: loginProcedure,
});

export type AppRouter = typeof appRouter;
