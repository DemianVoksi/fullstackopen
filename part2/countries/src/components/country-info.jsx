import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryInfo = ({ country }) => {
	const [weather, setWeather] = useState({
		temperature: null,
		icon: null,
		wind: null,
	});

	function kelvinToCelsius(kelvin) {
		const celsius = kelvin - 273.15;
		return celsius.toFixed(1);
	}

	async function fetchWeather(city, country, api_key) {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`
		);
		setWeather({
			temperature: kelvinToCelsius(response.data.main.temp),
			icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
			wind: response.data.wind.speed,
		});
	}

	useEffect(() => {
		fetchWeather(
			country.capital[0],
			country.name.common,
			import.meta.env.VITE_WEATHER
		);
	}, []);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>Capital city: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h2>Languages</h2>
			<ul>
				{Object.values(country.languages).map((language, index) => (
					<li key={index}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} />
			{weather && (
				<div>
					<h2>Weather in {country.capital[0]}</h2>
					<p>Temperature: {weather.temperature} Celsius</p>
					<img src={weather.icon} />
					<p>Wind speed: {weather.wind} m/s</p>
				</div>
			)}{' '}
		</div>
	);
};

export default CountryInfo;
