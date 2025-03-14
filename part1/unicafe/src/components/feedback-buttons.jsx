import React from 'react';
import Button from './button';

const FeedbackButtons = ({
	good,
	neutral,
	bad,
	setGood,
	setNeutral,
	setBad,
}) => {
	function handleGood() {
		setGood(good + 1);
	}

	function handleNeutral() {
		setNeutral(neutral + 1);
	}

	function handleBad() {
		setBad(bad + 1);
	}

	return (
		<div>
			<h1>give feedback</h1>
			<Button handle={handleGood} buttonType={'good'} />
			<Button handle={handleNeutral} buttonType={'neutral'} />
			<Button handle={handleBad} buttonType={'bad'} />
		</div>
	);
};

export default FeedbackButtons;
