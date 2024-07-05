import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from './trpc';
import { generateToken, hashPassword } from './utils/auth';

export const appRouter = router({
	register: publicProcedure
		.input(
			z.object({
				name: z.string(),
				password: z.string(),
			})
		)
		.mutation(async (opts) => {
			const { name, password } = opts.input;
			const { prisma } = opts.ctx;

			try {
				const user = await prisma.user.create({
					data: {
						name,
						passwordHash: hashPassword(password),
					},
				});

				return generateToken(user);
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Cannot register user with given credentials',
					cause: error,
				});
			}
		}),
});

export type AppRouter = typeof appRouter;
