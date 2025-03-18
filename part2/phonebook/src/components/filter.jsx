import React from 'react';

const Filter = ({ filterPersons }) => {
	return (
		<div>
			<label htmlFor='filtered'>filter shown for: </label>
			<input type='text' name='filtered' onChange={filterPersons} />
		</div>
	);
};

export default Filter;
