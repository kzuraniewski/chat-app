import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { MessageFieldComponent } from '@/components/message-field/message-field.component';
import { ChatService } from '@/services/chat.service';

@Component({
	selector: 'app-conversation-panel',
	standalone: true,
	templateUrl: './conversation-panel.component.html',
	imports: [MessageFieldComponent, ButtonModule],
})
export class ConversationPanelComponent implements OnInit, OnDestroy {
	activeConversationId: string | null = null;
	disconnect?: () => void;

	constructor(private chatService: ChatService) {}

	ngOnInit(): void {
		this.setupLiveChat();
	}

	ngOnDestroy(): void {
		this.disconnect?.();
	}

	sendMessage(message: string) {
		if (!this.activeConversationId) return;
		this.chatService.send(this.activeConversationId, message);
	}

	private async setupLiveChat() {
		const conversation = await this.chatService.createConversation(
			'668bfdb64ac9c2fe4477abad',
		);

		this.activeConversationId = conversation.id;
		this.disconnect = this.chatService.connect(conversation.id);
	}
}
