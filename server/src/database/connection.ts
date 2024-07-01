import { MongoClient, ServerApiVersion } from 'mongodb';

const atlasUri = process.env.ATLAS_URI || '';
const client = new MongoClient(atlasUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

try {
	await client.connect();
	await client.db('admin').command({ ping: 1 });
	console.log(
		'Pinged your deployment. You successfully connected to MongoDB!'
	);
} catch (error) {
	console.dir(error);
} finally {
	await client.close();
}

const db = client.db('employees');

export default db;
