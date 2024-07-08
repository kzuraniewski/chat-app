import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { hashPassword, setTokenCookie } from '../utils/auth';
import { publicProcedure } from './builders';

const registerProcedure = publicProcedure
	.input(
		z.object({
			username: z.string(),
			email: z.string().email(),
			password: z.string(),
		})
	)
	.mutation(async (opts) => {
		const { username, email, password } = opts.input;
		const { prisma, res } = opts.ctx;

		try {
			const { salt, hash } = hashPassword(password);

			const user = await prisma.user.create({
				data: {
					username,
					email,
					passwordHash: hash,
					salt,
				},
			});

			setTokenCookie(res, user);
		} catch (error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Cannot register user with given credentials',
				cause: error,
			});
		}
	});

export default registerProcedure;
