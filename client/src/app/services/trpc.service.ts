import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../../server/src/router';

@Injectable({
	providedIn: 'root',
})
export class TrpcService {
	protected trpc = createTRPCProxyClient<AppRouter>({
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
}
