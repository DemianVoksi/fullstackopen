import React from 'react';

const Search = ({ filterCountries, filteredCountries }) => {
	return (
		<div>
			<label htmlFor='countries'>find countries: </label>
			<input type='text' name='countries' onChange={filterCountries} />
			{filteredCountries && (
				<div>
					{filteredCountries.length > 10 ? (
						<p>Too many matches, specify another filter</p>
					) : (
						<div>
							{filteredCountries.map((country, index) => (
								<p key={index}>{country.name.common}</p>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
