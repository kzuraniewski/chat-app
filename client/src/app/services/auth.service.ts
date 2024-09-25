import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Trpc, TRPC } from '@/utils/trpc';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		@Inject(TRPC) private trpc: Trpc,
		private router: Router,
	) {}

	async register(username: string, email: string, password: string) {
		await this.trpc.app.register.mutate({
			username,
			email,
			password,
		});
		this.router.navigate(['/']);
	}

	async login(email: string, password: string) {
		await this.trpc.app.login.query({ email, password });
		this.router.navigate(['/']);
	}

	async getUser() {
		try {
			return await this.trpc.app.user.query();
		} catch {
			return null;
		}
	}
}
