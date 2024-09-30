import { t } from '@/trpc';

import onUpdateProcedure from './onUpdate.procedure';
import sendMessageProcedure from './sendMessage.procedure';

export const liveChatRouter = t.router({
	onUpdate: onUpdateProcedure,
	sendMessage: sendMessageProcedure,
});

export type LiveChatRouter = typeof liveChatRouter;
