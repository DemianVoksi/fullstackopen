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
		const value = e.target.value;
		const search = value[0].toUpperCase() + value.slice(1);

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
				setFilteredCountries={setFilteredCountries}
			/>
		</div>
	);
}

export default App;
