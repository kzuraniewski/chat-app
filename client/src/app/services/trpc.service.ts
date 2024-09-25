import { Injectable } from '@angular/core';
import {
	createTRPCProxyClient,
	createWSClient,
	httpBatchLink,
	wsLink,
} from '@trpc/client';
import { AppRouter } from '../../../../server/src/routers/app';
import { LiveChatRouter } from '../../../../server/src/routers/liveChat';

@Injectable({
	providedIn: 'root',
})
export class TrpcService {
	private static wsClient = createWSClient({
		url: 'ws://localhost:4198',

		onOpen() {
			console.log('WebSocket connection open');
		},

		onClose() {
			console.log('WebSocket connection closed');
		},
	});

	private appClient = createTRPCProxyClient<AppRouter>({
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

	private liveChatClient = createTRPCProxyClient<LiveChatRouter>({
		links: [
			wsLink({
				client: TrpcService.wsClient,
			}),
		],
	});

	protected trpc = {
		app: this.appClient,
		liveChat: this.liveChatClient,
	};
}
