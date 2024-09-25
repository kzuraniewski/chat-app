import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '@prisma/client';
import type * as express from 'express';

import env from './env';
import logger from '../lib/logger';

const SESSION_MAX_AGE = 1000 * 60 * 60 * 24; // 1 day

export const USERNAME_REGEX =
	/^(?=.{4,20}$)(?![_-])(?!.*[_-]{2})[a-zA-Z0-9-_]+(?<![_-])$/g;

export const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g;

const getRandomSalt = () => crypto.randomBytes(16).toString('hex');

export const hashPassword = (password: string, salt = getRandomSalt()) => {
	const hash = crypto
		.pbkdf2Sync(password, salt, 4200, 256, 'sha256')
		.toString('hex');

	return { salt, hash };
};

export const generateToken = (user: User, permanent = true) => {
	const iat = Math.floor(Date.now() / 1000);
	const exp = permanent ? iat + SESSION_MAX_AGE : 0;

	const payload: JwtPayload = {
		id: user.id,
		iat,
		exp,
	};

	return jwt.sign(payload, env.jwtSecret);
};

export const setTokenCookie = (
	res: express.Response<any, Record<string, any>>,
	user: User,
	permanent = true
) => {
	const token = generateToken(user, permanent);
	res.cookie('token', token, {
		httpOnly: true,
		secure: env.nodeEnv === 'production',
		maxAge: SESSION_MAX_AGE,
	});
};

const isTokenExpired = (payload: JwtPayload) => {
	return payload.exp < Date.now() / 1000;
};

export const getJwtPayload = (token: string | undefined) => {
	if (!token) return null;

	try {
		const payload = jwt.verify(token, env.jwtSecret);

		if (!isValidJwtPayload(payload)) {
			logger.warn(payload, 'Invalid JWT token payload');
			return null;
		}

		if (isTokenExpired(payload)) {
			logger.debug(payload, 'JWT token expired');
			return null;
		}

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

export const isValidJwtPayload = (value: unknown): value is JwtPayload => {
	return jwtPayloadSchema.safeParse(value).success;
};
