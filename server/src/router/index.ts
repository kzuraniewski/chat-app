import { t } from '../trpc';
import registerProcedure from './register.procedure';

export const appRouter = t.router({
	register: registerProcedure,
});

export type AppRouter = typeof appRouter;
