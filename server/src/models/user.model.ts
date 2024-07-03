import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minLength: 3,
		maxLength: 16,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 20,
	},
});

export const User = mongoose.model('User', schema);
