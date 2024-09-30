import { t } from '@/trpc';

import createProcedure from './create.procedure';
import getAllProcedure from './getAll.procedure';

const conversationsRouter = t.router({
	getAll: getAllProcedure,
	create: createProcedure,
});

export default conversationsRouter;
