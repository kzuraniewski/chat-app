import { Routes } from '@angular/router';
import { ConversationPanelComponent } from './components/conversation-panel/conversation-panel.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { RegisterPanelComponent } from './components/register-panel/register-panel.component';

export const routes: Routes = [
	{ path: '', component: ConversationPanelComponent },
	{ path: 'login', component: LoginPanelComponent },
	{ path: 'register', component: RegisterPanelComponent },
];
