import { Injectable } from '@angular/core';
import { TrpcService } from './trpc.service';

@Injectable({
	providedIn: 'root',
})
export class ChatService extends TrpcService {
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

		console.log('Live chat session started');

		return () => {
			subscription.unsubscribe();
			console.log('Live chat session closed');
		};
	}

	send(conversationId: string, content: string) {
		this.trpc.liveChat.sendMessage.mutate({
			content,
			conversationId,
		});
		console.log('Message sent');
	}
}
