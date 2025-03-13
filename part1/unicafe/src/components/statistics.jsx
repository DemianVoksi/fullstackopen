import React from 'react';

const Statistics = ({ good, neutral, bad }) => {
	let totalFeedback = good + neutral + bad;

	function getAverageScore(good, neutral, bad) {
		if (good + neutral + bad === 0) {
			return 'none';
		} else {
			return (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);
		}
	}

	function getPercentage(positive, total) {
		const percentage = (positive / total) * 100;
		if (percentage > 0) {
			return `${percentage}%`;
		} else {
			return '0%';
		}
	}

	let averageScore = getAverageScore(good, neutral, bad);
	let percentage = getPercentage(good, totalFeedback);

	return (
		<div>
			<h1>statistics</h1>
			<p>good: {good}</p>
			<p>neutral: {neutral}</p>
			<p>bad: {bad}</p>
			<p>all: {totalFeedback}</p>
			<p>average: {averageScore}</p>
			<p>positive: {percentage}</p>
		</div>
	);
};

export default Statistics;
