import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';
import { ButtonModule } from 'primeng/button';
import { ChatService } from '../../services/chat.service';

@Component({
	selector: 'app-conversation-panel',
	standalone: true,
	templateUrl: './conversation-panel.component.html',
	imports: [MessageFieldComponent, ButtonModule],
})
export class ConversationPanelComponent implements OnInit, OnDestroy {
	activeId: string | null = null;
	disconnect?: () => void;

	constructor(private chatService: ChatService) {}

	ngOnInit(): void {
		this.chatService
			.createConversation('668bfdb64ac9c2fe4477abad')
			.then((conversation) => {
				this.activeId = conversation.id;
				this.chatService.connect(conversation.id);
			});
	}

	ngOnDestroy(): void {
		this.disconnect?.();
	}

	sendMessage(message: string) {
		if (!this.activeId) return;
		this.chatService.send(this.activeId, message);
	}
}
