import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { protectedProcedure } from '../builders';

const sendMessageProcedure = protectedProcedure
	.input(
		z.object({
			conversationId: z.string(),
			content: z.string(),
		})
	)
	.mutation(async (opts) => {
		const { events, prisma, jwt } = opts.ctx;
		const { conversationId, content } = opts.input;

		try {
			const conversation = await prisma.conversation.findFirstOrThrow({
				where: { id: conversationId },
			});

			await prisma.message.create({
				data: {
					senderId: jwt.id,
					conversationId: conversation.id,
					content,
				},
			});

			events.emit('conversation:update', conversation.id);
		} catch {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Failed to send message for given conversation',
			});
		}
	});

export default sendMessageProcedure;
