import { z } from 'zod';
import { protectedProcedure } from '../../builders';

const createProcedure = protectedProcedure
	.input(
		z.object({
			userId: z.string(),
		})
	)
	.mutation(async (opts) => {
		const { prisma, jwt } = opts.ctx;
		const { userId } = opts.input;

		try {
			return await prisma.conversation.create({
				data: {
					userIds: [jwt.id, userId],
				},
			});
		} catch {
			return await prisma.conversation.findFirstOrThrow({
				where: {
					userIds: { hasEvery: [jwt.id, userId] },
				},
			});
		}
	});

export default createProcedure;
