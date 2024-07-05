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
				headers: () => {
					const token = this.getToken();
					if (!token) return {};

					return {
						Authorization: `bearer ${token}`,
					};
				},
			}),
		],
	});

	getToken() {
		return localStorage.getItem('token');
	}

	protected storeToken(token: string) {
		localStorage.setItem('token', token);
	}
}
