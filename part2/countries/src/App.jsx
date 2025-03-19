// `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
//`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`
import axios from 'axios';

import { useEffect, useState } from 'react';
import Search from './components/search';

function App() {
	const [allCountries, setAllCountries] = useState(null);
	const [filteredCountries, setFilteredCountries] = useState(null);

	async function fetchAllCountries() {
		const response = await axios.get(
			'https://studies.cs.helsinki.fi/restcountries/api/all'
		);
		setAllCountries(response.data);
	}

	function filterCountries(e) {
		e.preventDefault();
		const search = e.target.value;
		if (search === '') {
			setFilteredCountries(allCountries);
		} else {
			const filtered = allCountries.filter((country) =>
				country.name.common.includes(search)
			);
			setFilteredCountries(filtered);
		}
	}

	useEffect(() => {
		fetchAllCountries();
	}, []);

	return (
		<div>
			<Search
				filterCountries={filterCountries}
				filteredCountries={filteredCountries}
			/>
		</div>
	);
}

export default App;
