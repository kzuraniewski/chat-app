import assert from 'assert';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { hashPassword, setTokenCookie } from '@/utils/auth';

import { publicProcedure } from '../builders';

const loginProcedure = publicProcedure
	.input(
		z.object({
			email: z.string(),
			password: z.string(),
		}),
	)
	.query(async (opts) => {
		const { email, password } = opts.input;
		const { prisma, res } = opts.ctx;

		try {
			const user = await prisma.user.findFirstOrThrow({
				where: { email },
			});

			const { hash: inputHash } = hashPassword(password, user.salt);
			assert(user.passwordHash === inputHash);

			setTokenCookie(res, user);
		} catch {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Invalid username or password',
			});
		}
	});

export default loginProcedure;
