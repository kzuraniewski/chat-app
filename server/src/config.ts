import 'dotenv/config';
import logger from './lib/logger';

const env = (name: string) => {
	const value = process.env[name];
	if (!value) {
		const message = `Cannot get value of environment variable: "${name}"`;
		logger.fatal(message);
		throw new Error(message);
	}

	return value;
};

const config = {
	port: env('PORT'),
	atlasUri: env('ATLAS_URI'),
	jwtSecret: env('JWT_SECRET'),
} satisfies Record<string, string>;

export default config;
