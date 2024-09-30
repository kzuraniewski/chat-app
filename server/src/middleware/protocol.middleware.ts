import { ExpressContext, t, WsContext } from '@/trpc';

export type Protocol = 'http' | 'ws';

// TODO: Throw if invalid protocol

const protocol = <T extends Protocol>(_protocol: T) =>
	t.middleware((opts) => {
		return opts.next({
			ctx: opts.ctx as Omit<typeof opts.ctx, 'req' | 'res'> &
				Pick<
					T extends 'http' ? ExpressContext : WsContext,
					'req' | 'res'
				>,
		});
	});

export default protocol;
