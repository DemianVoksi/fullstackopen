import React from 'react';

const Total = ({ parts }) => {
	const total = parts.reduce((a, b) => a + b.exercises, 0);

	return (
		<div>
			<p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
		</div>
	);
};

export default Total;
