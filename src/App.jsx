import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Home, Vehicles, Configurator } from "./pages";
import { validModels } from "./constants/helpers";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="vehicles">
					<Route index element={<Vehicles />} />
					{validModels.map(({ name, component: Component }) => (
						<Route key={name} path={name} element={<Component />} />
					))}
					<Route path=":modelName/configurator" element={<Configurator />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
