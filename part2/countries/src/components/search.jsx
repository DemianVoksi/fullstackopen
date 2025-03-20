import React from 'react';
import CountryInfo from './country-info';
import CountryList from './country-list';

const Search = ({
	filterCountries,
	filteredCountries,
	setFilteredCountries,
}) => {
	const renderCountries = () => {
		if (!filteredCountries) return null;
		else if (filteredCountries.length > 10) {
			return <p>Too many matches, specify another filter</p>;
		} else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
			return (
				<CountryList
					filteredCountries={filteredCountries}
					setFilteredCountries={setFilteredCountries}
				/>
			);
		} else if (filteredCountries.length === 1) {
			return <CountryInfo country={filteredCountries[0]} />;
		}
	};
	return (
		<div>
			<label htmlFor='countries'>find countries: </label>
			<input type='text' name='countries' onChange={filterCountries} />
			{renderCountries()}
		</div>
	);
};

export default Search;
