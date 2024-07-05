import { TRPCError } from '@trpc/server';
import { authProcedure } from './builders';
import { generateToken, hashPassword } from '../utils/auth';
import assert from 'assert';

const loginProcedure = authProcedure.query(async (opts) => {
	const { name, password } = opts.input;
	const { prisma } = opts.ctx;

	try {
		const user = await prisma.user.findFirstOrThrow({
			where: {
				name,
			},
		});

		const { hash: inputHash } = hashPassword(password, user.salt);
		assert(user.passwordHash === inputHash);

		return generateToken(user);
	} catch {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Invalid username or password',
		});
	}
});

export default loginProcedure;
