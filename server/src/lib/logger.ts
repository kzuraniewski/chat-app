import pino from 'pino';

const logger = pino({
	transport: {
		target: 'pino-pretty',
	},
	level: 'debug',
});

export default logger;
