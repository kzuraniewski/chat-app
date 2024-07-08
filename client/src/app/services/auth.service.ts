import { Injectable } from '@angular/core';
import { TrpcService } from './trpc.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends TrpcService {
	constructor(private router: Router) {
		super();
	}

	async register(username: string, email: string, password: string) {
		await this.trpc.register.mutate({
			username,
			email,
			password,
		});
		this.router.navigate(['/']);
	}

	async login(email: string, password: string) {
		await this.trpc.login.query({ email, password });
		this.router.navigate(['/']);
	}

	async getUser() {
		try {
			return await this.trpc.user.query();
		} catch {
			return null;
		}
	}
}
