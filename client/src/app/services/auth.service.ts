import { Injectable } from '@angular/core';
import { TrpcService } from './trpc.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends TrpcService {
	async register(username: string, email: string, password: string) {
		const token = await this.trpc.register.mutate({
			username,
			email,
			password,
		});
		this.storeToken(token);
	}

	async login(email: string, password: string) {
		const token = await this.trpc.login.query({ email, password });
		this.storeToken(token);
	}
}
