import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '@/services/auth.service';

@Component({
	selector: 'app-login-panel',
	standalone: true,
	templateUrl: './login-panel.component.html',
	imports: [
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		CardModule,
		FloatLabelModule,
		PasswordModule,
		MessagesModule,
	],
})
export class LoginPanelComponent {
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});
	messages: Message[] = [];

	constructor(private authService: AuthService) {}

	async handleLogin() {
		const { email, password } = this.loginForm.value;
		if (!email || !password) return;

		try {
			await this.authService.login(email, password);
		} catch {
			this.loginForm.setErrors({ invalid: true });
			this.showErrorMessage();
		}
	}

	showErrorMessage() {
		this.messages = [
			{
				severity: 'error',
				summary: 'Invalid username or password',
			},
		];
	}
}
