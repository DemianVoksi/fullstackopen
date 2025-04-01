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

const favoriteBlog = (blogs) => {
	return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
	const appearances = [];

	blogs.forEach((blog) =>
		!appearances.find((item) => item.author === blog.author)
			? appearances.push({
					author: blog.author,
					blogs: 1,
			  })
			: appearances.map((ap) => (ap.author === blog.author ? ap.blogs++ : null))
	);

	const result = appearances.reduce((max, blog) =>
		blog.blogs > max.blogs ? blog : max
	);
	return result;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
