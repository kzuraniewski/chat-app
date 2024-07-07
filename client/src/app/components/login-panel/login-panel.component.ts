import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-panel',
	standalone: true,
	templateUrl: './login-panel.component.html',
	imports: [
		FormsModule,
		ButtonModule,
		InputTextModule,
		CardModule,
		FloatLabelModule,
		PasswordModule,
	],
})
export class LoginPanelComponent {
	username = 'root';
	password = 'password';

	constructor(private authService: AuthService) {}

	handleLogin() {
		this.authService.login(this.username, this.password);
	}
}
