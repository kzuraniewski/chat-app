import { PrismaClient } from '@prisma/client';
import logger from './lib/logger';

export const prisma = new PrismaClient({
	log: [
		{ emit: 'event', level: 'query' },
		{ emit: 'event', level: 'info' },
		{ emit: 'event', level: 'warn' },
		{ emit: 'event', level: 'error' },
	],
});

prisma.$on('query', (e) => {
	logger.debug(e, 'Query invoked');
});

prisma.$on('info', (e) => {
	logger.info(e.message);
});

prisma.$on('warn', (e) => {
	logger.warn(e.message);
});

prisma.$on('error', (e) => {
	logger.error(e.message);
});
