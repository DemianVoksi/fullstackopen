import React from 'react';

const Part1 = ({ part1 }) => {
	return (
		<div>
			<p>
				{part1.name} {part1.exercises}
			</p>
		</div>
	);
};

export default Part1;
