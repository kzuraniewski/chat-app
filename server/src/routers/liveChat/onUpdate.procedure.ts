import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { protectedProcedure, wsProcedure } from '../builders';

const onUpdateProcedure = wsProcedure
	.input(
		z.object({
			conversationId: z.string(),
		})
	)
	.subscription(async (opts) => {
		const { events, prisma, jwt } = opts.ctx;
		const { conversationId } = opts.input;

		try {
			const { id } = await prisma.conversation.findFirstOrThrow({
				where: {
					id: conversationId,
					userIds: { has: jwt.id },
				},
			});

			return observable<string>((emit) => {
				const onUpdate = async (conversationId: string) => {
					if (conversationId !== id) return;

					const { messages } =
						await prisma.conversation.findFirstOrThrow({
							where: { id },
							select: { messages: true },
						});

					emit.next(JSON.stringify(messages));
				};

				events.on('conversation:update', onUpdate);
				return () => {
					events.off('conversation:update', onUpdate);
				};
			});
		} catch {
			throw new TRPCError({
				code: 'BAD_REQUEST',
			});
		}
	});

export default onUpdateProcedure;
