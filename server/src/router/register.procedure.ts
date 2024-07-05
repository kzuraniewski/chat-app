import { TRPCError } from '@trpc/server';
import { hashPassword, generateToken } from '../utils/auth';
import { authProcedure } from './builders';

const registerProcedure = authProcedure.mutation(async (opts) => {
	const { name, password } = opts.input;
	const { prisma } = opts.ctx;

	try {
		const { salt, hash } = hashPassword(password);

		const user = await prisma.user.create({
			data: {
				name,
				passwordHash: hash,
				salt,
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
});

export default registerProcedure;
