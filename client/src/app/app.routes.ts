import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';

import { ConversationPanelComponent } from '@/components/conversation-panel/conversation-panel.component';
import { LoginPanelComponent } from '@/components/login-panel/login-panel.component';
import { RegisterPanelComponent } from '@/components/register-panel/register-panel.component';
import { AuthService } from '@/services/auth.service';

export const authGuard: CanActivateFn = async () => {
	const router = inject(Router);
	const user = await inject(AuthService).getUser();

	if (!user) {
		return router.navigate(['login']);
	}

	return !!user;
};

export const routes: Routes = [
	{
		path: 'app',
		component: ConversationPanelComponent,
		canActivate: [authGuard],
	},
	{
		path: '',
		redirectTo: '/app',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginPanelComponent,
	},
	{
		path: 'register',
		component: RegisterPanelComponent,
	},
];
