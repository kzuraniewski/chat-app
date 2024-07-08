import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormValidationService } from '../../services/form-validation.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

// FIXME: When changing password, error is not shown when repeat password field stays the same, only after its change

@Component({
	selector: 'app-register-panel',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		CardModule,
		ButtonModule,
		FloatLabelModule,
		InputTextModule,
		MessagesModule,
	],
	templateUrl: './register-panel.component.html',
})
export class RegisterPanelComponent {
	registerForm = new FormGroup({
		username: new FormControl('', this.formValidationService.username),
		email: new FormControl('', this.formValidationService.email),
		password: new FormControl('', this.formValidationService.password),
		repeatPassword: new FormControl('', [
			Validators.required,
			this.formValidationService.match('password'),
		]),
	});
	messages: Message[] = [];

	constructor(
		private authService: AuthService,
		private formValidationService: FormValidationService,
	) {}

	async handleSubmit() {
		const { username, email, password } = this.registerForm.value;
		if (!username || !email || !password) return;

		try {
			await this.authService.register(username, email, password);
		} catch {
			this.registerForm.setErrors({ invalid: true });
			this.showErrorMessage();
		}
	}

	showErrorMessage() {
		this.messages = [
			{
				severity: 'error',
				summary: 'Cannot register user with given credentials',
			},
		];
	}
}
