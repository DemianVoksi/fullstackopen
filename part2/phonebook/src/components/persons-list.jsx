import React from 'react';
import { removeData } from '../backend/backendFunctions';

const PersonsList = ({ filteredPersons, fetchData, setMessage }) => {
	const handleRemove = async (id, setMessage, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			try {
				const success = await removeData(id, setMessage, name);
				if (success) {
					await fetchData();
				}
			} catch (error) {
				setMessage({
					type: 'error',
					content: 'Connection error - could not delete person',
				});
			}
		}
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
						onClick={() => handleRemove(person._id, setMessage, person.name)}
					>
						delete
					</button>
				</div>
			))}
		</div>
	);
};

export default PersonsList;
