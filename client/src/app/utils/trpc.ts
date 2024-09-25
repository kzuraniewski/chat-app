import { InjectionToken } from '@angular/core';
import {
	createTRPCProxyClient,
	createWSClient,
	httpBatchLink,
	wsLink,
} from '@trpc/client';

import { AppRouter } from '../../../../server/src/routers/app';
import { LiveChatRouter } from '../../../../server/src/routers/liveChat';

// FIXME no imports from server

const wsClient = createWSClient({
	url: 'ws://localhost:4198',

	onOpen() {
		console.log('WebSocket connection open');
	},

	onClose() {
		console.log('WebSocket connection closed');
	},
});

const appClient = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:4199',
			fetch: (input, init) => {
				return fetch(input, {
					...init,
					credentials: 'include',
				});
			},
		}),
	],
});

const liveChatClient = createTRPCProxyClient<LiveChatRouter>({
	links: [
		wsLink({
			client: wsClient,
		}),
	],
});

const trpc = {
	app: appClient,
	liveChat: liveChatClient,
};

export type Trpc = typeof trpc;

export const TRPC = new InjectionToken('trpc', {
	providedIn: 'root',
	factory: () => trpc,
});
