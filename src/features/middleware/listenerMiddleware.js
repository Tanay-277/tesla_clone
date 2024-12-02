import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setImg } from "../configurator/imgSlice";
import {
	setModel,
	setInterior,
	setExterior,
	setRims,
	setTrim,
} from "../configurator/pricingSlice";

const listenerMiddleware = createListenerMiddleware();

// img: "/images/model-y-stealth-grey.jpg",

const decodeModelNames = (modelName) => {
	return modelName.slice(0, -1) + "-" + modelName[modelName.length - 1];
};

listenerMiddleware.startListening({
	actionCreator: setModel,
	effect: (action, listenerApi) => {
		const modelName = action.payload;
		const defaultImage = `/images/${decodeModelNames(
			modelName
		)}-stealth-grey.jpg`;
		listenerApi.dispatch(setImg(defaultImage)); // Update imgSlice
	},
});

listenerMiddleware.startListening({
	actionCreator: setInterior, // Triggered when interior is changed
	effect: (action, listenerApi) => {
		const selectedInterior = action.payload.name; // Interior name
		const modelName = listenerApi.getState().pricing.model; // Current model
		const interiorImage = `/images/${decodeModelNames(
			modelName
		)}-${selectedInterior.toLowerCase().replaceAll(" ", "-")}.jpg`;
		listenerApi.dispatch(setImg(interiorImage)); // Update imgSlice
	},
});

listenerMiddleware.startListening({
	actionCreator: setExterior, // Triggered when exterior is changed
	effect: (action, listenerApi) => {
		const selectedExterior = action.payload.name;
		const modelName = listenerApi.getState().pricing.model;
		const selectedTrim = listenerApi.getState().pricing.trim.selectedTrim.name;
		let exteriorImage;
		if (selectedTrim.includes("Performance")) {
			const modelName = listenerApi.getState().pricing.model;
			exteriorImage = `/images/${decodeModelNames(modelName)}-${selectedExterior
				.toLowerCase()
				.replaceAll("_", "-")}-performance.jpg`;
		} else {
			exteriorImage = `/images/${decodeModelNames(modelName)}-${selectedExterior
				.toLowerCase()
				.replaceAll("_", "-")}.jpg`;
		}
		listenerApi.dispatch(setImg(exteriorImage));
	},
});

listenerMiddleware.startListening({
	actionCreator: setRims, // Triggered when rims are changed
	effect: (action, listenerApi) => {
		const selectedRims = action.payload.name; // Rims name
		const modelName = listenerApi.getState().pricing.model; // Current model
		const rimsImage = `/images/${decodeModelNames(modelName)}-${selectedRims
			.toLowerCase()
			.replaceAll("''", "")
			.replaceAll(" ", "-")}.jpeg`;
		listenerApi.dispatch(setImg(rimsImage)); // Update imgSlice
	},
});

listenerMiddleware.startListening({
	actionCreator: setTrim,
	effect: (action, listenerApi) => {
		const selectedTrim = action.payload.name;
		const selectedExterior = listenerApi.getState().pricing.exterior.name;
		if (selectedTrim.includes("Performance")) {
			const modelName = listenerApi.getState().pricing.model;
			const trimImage = `/images/${decodeModelNames(
				modelName
			)}-${selectedExterior
				.toLowerCase()
				.replaceAll("_", "-")}-performance.jpg`;
			listenerApi.dispatch(setImg(trimImage));
		} else {
			const modelName = listenerApi.getState().pricing.model;
			const trimImage = `/images/${decodeModelNames(
				modelName
			)}-${selectedExterior.toLowerCase().replaceAll("_", "-")}.jpg`;
			listenerApi.dispatch(setImg(trimImage));
		}
	},
});

export default listenerMiddleware;
