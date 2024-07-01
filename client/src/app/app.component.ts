import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageFieldComponent } from './components/message-field/message-field.component';
import { ConversationPanelComponent } from './components/conversation-panel/conversation-panel.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	imports: [RouterOutlet, MessageFieldComponent, ConversationPanelComponent],
})
export class AppComponent {}
