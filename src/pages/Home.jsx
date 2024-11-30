import React from "react";
import { Link } from "react-router";

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link to="/vehicles">Vehicles</Link>
			<Link to="/vehicles/modely">ModelX</Link>
			<Link to="/vehicles/modely/configurator">Config</Link>
		</div>
	);
};

export default Home;