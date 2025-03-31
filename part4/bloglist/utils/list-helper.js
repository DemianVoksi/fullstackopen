const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0;
	}
	if (blogs.length === 1) {
		return blogs[0].likes;
	} else {
		const total = blogs.reduce((acc, obj) => {
			return acc + obj.likes;
		}, 0);
		return total;
	}
};

module.exports = {
	dummy,
	totalLikes,
};
