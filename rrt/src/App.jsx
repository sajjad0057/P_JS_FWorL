import React from "react";
import Counter from "./components/Counter";
import Stats from "./components/Stats";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counters/countersSlice";

const App = () => {
	//// ***The useSelector hook lets us access and use state directly from the Redux store in our components.
	const counters = useSelector((state) => state.counters);

	/// ***The useDispatch hook in React-Redux is used to send actions to the Redux store
	const dispatch = useDispatch();

	const totalCount = counters.reduce((sum, current) => sum + current.value, 0);

	const handleIncrement = (counterid) => dispatch(increment(counterid));

	const handleDecrement = (counterid) => dispatch(decrement(counterid));

	return (
		<div className="w-screen h-screen p-10 bg-gray-100 text-slate-700">
			<h1 className="max-w-md mx-auto text-center text-2xl font-bold p-2">
				Welcome to simple counter application
			</h1>
			<hr />
			<div className="max-w-md mx-auto mt-10 space-y-5">
				{counters.map((counter) => (
					<Counter
						count={counter.value}
						key={counter.id}
						onIncrement={() => handleIncrement(counter.id)}
						onDecrement={() => handleDecrement(counter.id)}
					/>
				))}
				<Stats totalCount={totalCount} />
			</div>
		</div>
	);
};

export default App;
