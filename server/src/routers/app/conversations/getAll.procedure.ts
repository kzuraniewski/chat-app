import { protectedProcedure } from '../../builders';

const getAllProcedure = protectedProcedure.query(async (opts) => {
	const { jwt, prisma } = opts.ctx;

	// try {
	const { conversations } = await prisma.user.findFirstOrThrow({
		where: { id: jwt.id },
		select: {
			conversations: {
				select: {
					id: true,
					userIds: true,
				},
			},
		},
	});

	return conversations;
	// } catch {}
});

export default getAllProcedure;
