import { Inject, Injectable } from '@angular/core';

import { LogService } from '@/services/log.service';
import { Trpc, TRPC } from '@/utils/trpc';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	constructor(
		@Inject(TRPC) private trpc: Trpc,
		private logService: LogService,
	) {}

	createConversation(userId: string) {
		return this.trpc.app.conversations.create.mutate({
			userId,
		});
	}

	connect(conversationId: string) {
		const subscription = this.trpc.liveChat.onUpdate.subscribe(
			{ conversationId },
			{
				onData(data) {
					console.log(JSON.parse(data));
				},
			},
		);

		this.logService.debug('Live chat session started');

		return () => {
			subscription.unsubscribe();
			this.logService.debug('Live chat session closed');
		};
	}

	send(conversationId: string, content: string) {
		this.trpc.liveChat.sendMessage.mutate({
			content,
			conversationId,
		});
		this.logService.debug('Message sent');
	}
}
