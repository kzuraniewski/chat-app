import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { PASSWORD_REGEX, USERNAME_REGEX } from '../../utils/auth';

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
	],
})
export class LoginPanelComponent {
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(private authService: AuthService) {}

	handleLogin() {
		const { email, password } = this.loginForm.value;
		if (!email || !password) return;

		this.authService.login(email, password);
	}
}
