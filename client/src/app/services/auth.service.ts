import { Injectable } from '@angular/core';
import { TrpcService } from './trpc.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends TrpcService {
	async register(name: string, password: string) {
		const token = await this.trpc.register.mutate({ name, password });
		this.storeToken(token);
	}

	async login(name: string, password: string) {
		const token = await this.trpc.login.query({ name, password });
		this.storeToken(token);
	}
}
