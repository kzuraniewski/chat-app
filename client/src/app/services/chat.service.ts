import { Injectable, OnDestroy } from '@angular/core';
import { TrpcService } from './trpc.service';
import { Unsubscribable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ChatService extends TrpcService implements OnDestroy {
	private subscription?: Unsubscribable;

	createConversation(userId: string) {
		return this.trpc.app.conversations.create.mutate({
			userId,
		});
	}

	connect(conversationId: string) {
		if (this.subscription)
			throw new Error('Attempt to resubscribe for chat events');

		this.subscription = this.trpc.liveChat.onUpdate.subscribe(
			{ conversationId },
			{
				onData(data) {
					console.log(JSON.parse(data));
				},
			},
		);

		console.log('Live chat session started');
	}

	send(conversationId: string, content: string) {
		this.trpc.liveChat.sendMessage.mutate({
			content,
			conversationId,
		});
		console.log('Message sent');
	}

	ngOnDestroy() {
		if (!this.subscription) return;

		this.subscription.unsubscribe();
		console.log('Live chat session closed');
	}
}
