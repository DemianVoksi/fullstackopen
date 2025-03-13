import { useState } from 'react';
import FeedbackButtons from './components/feedback-buttons';
import Statistics from './components/statistics';

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<FeedbackButtons
				good={good}
				neutral={neutral}
				bad={bad}
				setGood={setGood}
				setNeutral={setNeutral}
				setBad={setBad}
			/>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
}

export default App;
