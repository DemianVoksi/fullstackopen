import React from 'react';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';

const Content = ({ parts }) => {
	return (
		<div>
			<Part1 part1={parts[0]} />
			<Part2 part2={parts[1]} />
			<Part3 part3={parts[2]} />
		</div>
	);
};

export default Content;
