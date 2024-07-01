import { Component } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';

@Component({
	selector: 'app-conversation-panel',
	standalone: true,
	templateUrl: './conversation-panel.component.html',
	imports: [MessageFieldComponent],
})
export class ConversationPanelComponent {}
