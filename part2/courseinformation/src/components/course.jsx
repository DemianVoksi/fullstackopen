import React from 'react';
import Content from './content';
import Header from './header';

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

export default Course;
