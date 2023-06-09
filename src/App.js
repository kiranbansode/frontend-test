import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const [clientIpAdd, setClientIpAdd] = useState(null);

	useEffect(() => {
		let setTimeoutId;

		(async () => {
			/* 
        Note:-
        This is free service, So sometime network request can be slow.
        If you unable to see ip address, then it is highly chance that network request is still pending.
        You can check request's status in Developer Tool's `Network tab` [Choose `Fetch/XHR`]. 
        Sometimes mine took almost a minute to get client's ip address
      */
			await fetch("https://api.ipify.org?format=json")
				.then((res) => res.json())
				.then((data) => setClientIpAdd(data.ip))
				// Usually if we have an error we can either use `Modal` or `Alert` component.
				// ErrorBoundary also can be used.
				.catch((err) => err);
		})();

		// This will clear out setTimeout() using it's id when App component get's unmounted
		return () => {
			clearTimeout(setTimeoutId);
		};
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{clientIpAdd ? (
					<p>
						Client IP:
						<span className="client-ip">{clientIpAdd}</span>
					</p>
				) : (
					<p className="loading">Loading...</p>
				)}
			</header>
		</div>
	);
}

export default App;
