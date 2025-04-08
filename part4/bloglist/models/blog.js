const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
	{
		content: {
			title: String,
			author: String,
			url: String,
			likes: Number,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ collection: 'blogs' }
);

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Blog', blogSchema);
