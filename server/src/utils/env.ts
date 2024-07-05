import 'dotenv/config';
import logger from '../lib/logger';

const use = (name: string) => {
	const value = process.env[name];
	if (!value) {
		const message = `Cannot get value of environment variable: "${name}"`;
		logger.fatal(message);
		throw new Error(message);
	}

	return value;
};

const env = {
	port: use('PORT'),
	atlasUri: use('ATLAS_URI'),
	jwtSecret: use('JWT_SECRET'),
} satisfies Record<string, string>;

export default env;
