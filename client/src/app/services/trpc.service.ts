import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../../server/src/router';

@Injectable({
	providedIn: 'root',
})
export class TrpcService {
	private trpc = createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: 'http://localhost:4199',
			}),
		],
	});
}
