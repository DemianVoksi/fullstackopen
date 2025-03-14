import React from 'react';
import StatisticLine from './statistic-line';
// 1.8 unicafe step 3: statistics already in their own component

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
			{totalFeedback > 0 ? (
				<div>
					<StatisticLine text={'good:'} value={good} />
					<StatisticLine text={'neutral:'} value={neutral} />
					<StatisticLine text={'bad:'} value={bad} />
					<StatisticLine text={'all:'} value={totalFeedback} />
					<StatisticLine text={'average:'} value={averageScore} />
					<StatisticLine text={'positive:'} value={percentage} />
				</div>
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};

export default Statistics;
