import { MongoClient, ServerApiVersion } from 'mongodb';
import logger from '../lib/logger';

const atlasUri = process.env['ATLAS_URI'] || '';
const client = new MongoClient(atlasUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

const connect = async () => {
	try {
		const connection = await client.connect();
		logger.info('Connected to MongoDB');
		return connection;
	} catch (error) {
		logger.error({ error }, 'Failed to connect to MongoDB');
		throw error;
	}
};

await connect();

const db = client.db('main');
export default db;
