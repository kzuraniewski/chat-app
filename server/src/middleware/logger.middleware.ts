import logger from '../lib/logger';
import { t } from '../trpc';

const loggerMiddleware = t.middleware(async (opts) => {
	const start = Date.now();

	const result = await opts.next();

	const duration = Date.now() - start;
	const { path, type, rawInput } = opts;

	if (result.ok) {
		logger.info(
			{
				path,
				type,
				rawInput,
				duration,
			},
			'Procedure called successfully'
		);
	} else {
		logger.error(
			{
				path,
				type,
				rawInput,
				duration,
				error: result.error,
			},
			'Procedure failed'
		);
	}

	return result;
});

export default loggerMiddleware;
