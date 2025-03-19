import React from 'react';
import { removeData } from '../backend/backendFunctions';

const PersonsList = ({ filteredPersons, fetchData, setMessage }) => {
	const handleRemove = async (id, setMessage, name) => {
		await removeData(id, setMessage, name);
		await fetchData();
	};

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
					<p style={{ marginRight: '5px' }}>{person.number}</p>
					<button
						onClick={() => handleRemove(person.id, setMessage, person.name)}
					>
						delete
					</button>
				</div>
			))}
		</div>
	);
};

export default PersonsList;
