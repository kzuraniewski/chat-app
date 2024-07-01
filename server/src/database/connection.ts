import { MongoClient, ServerApiVersion } from 'mongodb';

const atlasUri = process.env['ATLAS_URI'] || '';
const client = new MongoClient(atlasUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export const connect = async () => {
	try {
		await client.connect();
		await client.db('admin').command({ ping: 1 });
		console.log('Connected to MongoDB');
	} catch (error) {
		console.dir(error);
	}
};

export const disconnect = async () => {
	return client.close();
};

const db = client.db('main');

export default db;
