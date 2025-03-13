import React from 'react';

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
			<button onClick={handleGood}>good</button>
			<button onClick={handleNeutral}>neutral</button>
			<button onClick={handleBad}>bad</button>
		</div>
	);
};

export default FeedbackButtons;
