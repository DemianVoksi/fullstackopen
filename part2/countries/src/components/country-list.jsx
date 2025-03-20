import React from 'react';

const CountryList = ({ filteredCountries, setFilteredCountries }) => {
	return (
		<div>
			{filteredCountries.map((country, index) => (
				<div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
					<p style={{ marginRight: '5px' }}>{country.name.common}</p>
					<button onClick={() => setFilteredCountries([country])}>
						select
					</button>
				</div>
			))}
		</div>
	);
};

export default CountryList;
