import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { createContext } from '../trpc';

describe('TRPC module', () => {
	const mockOptions = {
		req: {
			headers: { cookie: 'test' },
		},
		res: {},
	} as CreateExpressContextOptions | CreateWSSContextFnOptions;

	it('exports a valid createContext method', () => {
		const context = createContext(mockOptions);

		expect(context.prisma).toBeDefined();
		expect(context.events).toBeDefined();
		expect(context.jwt).toBeDefined();
		expect(context.req).toBeDefined();
		expect(context.res).toBeDefined();
	});
});
