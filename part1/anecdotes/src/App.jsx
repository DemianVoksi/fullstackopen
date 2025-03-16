import { useState } from 'react';

function App() {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];
	const initialVotes = [0, 0, 0, 0, 0, 0, 0, 0];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(initialVotes);

	function assignVote(position) {
		setVotes(
			votes.map((vote, index) => {
				if (index === position) {
					return vote + 1;
				} else {
					return vote;
				}
			})
		);
	}

	function getRandomAnecdote() {
		const randomNumber = Math.floor(Math.random() * anecdotes.length);
		setSelected(randomNumber);
	}

	function getMostPopular() {
		const biggestNumberPosition = votes.indexOf(
			votes.reduce((a, b) => Math.max(a, b))
		);
		return biggestNumberPosition;
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={() => assignVote(selected)}>vote</button>
			<button onClick={() => getRandomAnecdote()}>next anecdote</button>
			<h1>Anecdote with the most votes</h1>
			<p>{`The most popular anecdote is "${anecdotes[getMostPopular()]}" with ${
				votes[getMostPopular()]
			} votes`}</p>
		</div>
	);
}

export default App;
