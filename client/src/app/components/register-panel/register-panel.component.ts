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

@Component({
	selector: 'app-register-panel',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		CardModule,
		ButtonModule,
		FloatLabelModule,
		InputTextModule,
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

	constructor(
		private authService: AuthService,
		private formValidationService: FormValidationService,
	) {}

	handleSubmit() {
		const { username, email, password } = this.registerForm.value;
		if (!username || !email || !password) return;

		this.authService.register(username, email, password);
	}
}
