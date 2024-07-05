import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '@prisma/client';

import env from './env';

export const USERNAME_REGEX =
	/^(?=.{4,20}$)(?![_-])(?!.*[_-]{2})[a-zA-Z0-9-_]+(?<![_-])$/g;

export const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g;

export const hashPassword = (password: string) => {
	const salt = crypto.randomBytes(16).toString('hex');
	return crypto
		.pbkdf2Sync(password, salt, 4200, 256, 'sha256')
		.toString('hex');
};

const getTokenFromAuthHeader = (authHeader: string) => {
	const split = authHeader.split(' ');
	if (split.length !== 2) throw new Error();

	const [prefix, token] = split;

	if (prefix !== 'bearer') throw new Error();

	return token;
};

export const generateToken = (user: User) => {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 1);

	return jwt.sign(
		{
			id: user.id,
			exp: Math.floor(exp.getTime() / 1000),
		},
		env.jwtSecret
	);
};

export const getJwtPayloadFromAuthHeader = (
	authHeader: string | undefined
): JwtPayload | null => {
	if (!authHeader) return null;

	try {
		const token = getTokenFromAuthHeader(authHeader);
		const payload = jwt.verify(token, env.jwtSecret);

		if (!isJwtPayload(payload)) return null;
		return payload;
	} catch {
		return null;
	}
};

const jwtPayloadSchema = z.object({
	id: z.string(),
	exp: z.number(),
	iat: z.number(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export const isJwtPayload = (value: unknown): value is JwtPayload => {
	return jwtPayloadSchema.safeParse(value).success;
};
