import logger from '../lib/logger';
import mongoose from 'mongoose';
import config from '../config';

try {
	await mongoose.connect(config.atlasUri);
	logger.info('Connected to MongoDB');
} catch (error) {
	logger.error({ error }, 'Failed to connect to MongoDB');
	throw error;
}
