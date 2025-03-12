import Content from '../components/content';
import Header from '../components/header';
import Total from '../components/total';

function App() {
	const course = 'Half Stack application development';
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10,
	};
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7,
	};
	const part3 = {
		name: 'State of a component',
		exercises: 14,
	};
	const total = part1.exercises + part2.exercises + part3.exercises;

	return (
		<div>
			<Header course={course} />
			<Content part1={part1} part2={part2} part3={part3} />
			<Total total={total} />
		</div>
	);
}

export default App;
