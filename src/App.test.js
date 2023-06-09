import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Checking <App/> component", () => {
	test("renders React Logo", () => {
		render(<App />);
		const linkElement = screen.getByAltText(/logo/i);
		expect(linkElement).toBeInTheDocument();
	});

	/* 
		If this test broke, just refresh all tests. 
	*/
	test("renders correct ip address", async () => {
		render(<App />);

		const ip = await fetch("https://api.ipify.org?format=json")
			.then((res) => res.json())
			.then((data) => data.ip);

		const clientIp = await screen.findByText(
			/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i
		);

		expect(clientIp.textContent).toEqual(ip);
	}, 60000); // setting timeout to 1 minute. Sometimes `ipify` api are slow

	test("renders 'Loading...' text", () => {
		render(<App />);
		const loadingPara = screen.queryByText("Loading...");
		expect(loadingPara).toBeInTheDocument();
	});
});
