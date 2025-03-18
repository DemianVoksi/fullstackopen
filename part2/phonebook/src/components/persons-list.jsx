import React from 'react';

const PersonsList = ({ filteredPersons }) => {
	return (
		<div>
			{filteredPersons.map((person, index) => (
				<div
					key={index}
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<p style={{ marginRight: '5px' }}>{person.name}</p>
					<p>{person.number}</p>
				</div>
			))}
		</div>
	);
};

export default PersonsList;
