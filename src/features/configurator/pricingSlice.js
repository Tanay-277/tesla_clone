import { createSlice } from "@reduxjs/toolkit";
import {
	paymentMethods,
	generateCustomizationCatalog,
	getCustomizationButtons,
	validModels,
	calculatePriceWithIncentives,
	decodeModelName,
} from "../../constants/helpers";
import { pricingData } from "../../constants";

const createInitialState = (modelName) => {
	const model = modelName;
	const catalog = generateCustomizationCatalog(model);

	const availableOptions = {
		exterior: getCustomizationButtons(model, "exterior", catalog) || [],
		rims: getCustomizationButtons(model, "rims", catalog) || [],
		interior: getCustomizationButtons(model, "interior", catalog) || [],
	};

	const selectedModel = pricingData.models.find(
		(mod) => mod.name === decodeModelName(model)
	);
	console.log("Selected Model", selectedModel);

	return {
		model,
		trim: {
			paymentType: paymentMethods[0] || "Default Payment",
			selectedTrim: {
				name: selectedModel?.trims?.[0]?.name || "Default Trim",
				pricing: selectedModel?.trims?.[0]?.pricing?.cash || {
					price: 0,
					incentives: 0,
				},
			},
			incentivesChecked: true,
		},
		interior: availableOptions.interior?.[0] || {
			name: "Default Interior",
			price: 0,
		},
		exterior: availableOptions.exterior?.[0] || {
			name: "Default Exterior",
			price: 0,
		},
		rims: availableOptions.rims?.[0] || { name: "Default Rims", price: 0 },
		finalPrice: calculatePriceWithIncentives(
			paymentMethods[0],
			selectedModel?.trims?.[0]?.pricing?.cash?.price || 0,
			selectedModel?.trims?.[0]?.pricing?.cash?.incentives || 0,
			true
		),
	};
};

const initialState = createInitialState(
	validModels[0]?.name || "Default Model"
);

const recalculateFinalPrice = (state) => {
	const { price = 0, incentives = 0 } = state.trim.selectedTrim.pricing || {};
	const interiorPrice = state.interior?.price || 0;
	const exteriorPrice = state.exterior?.price || 0;
	const rimsPrice = state.rims?.price || 0;

	return (
		calculatePriceWithIncentives(
			state.trim.paymentType,
			price,
			incentives,
			state.trim.incentivesChecked
		) +
		interiorPrice +
		exteriorPrice +
		rimsPrice
	);
};

export const pricingSlice = createSlice({
	name: "pricing",
	initialState,
	reducers: {
		setModel: (state, action) => {
			return createInitialState(action.payload);
		},
		setPaymentType: (state, action) => {
			state.trim.paymentType = action.payload;
			state.trim.selectedTrim = {
				name: state.trim.selectedTrim.name,
				pricing: pricingData.models[0].trims.find(
					(trim) => trim.name === state.trim.selectedTrim.name
				)?.pricing[action.payload.toLowerCase()],
			};
			state.finalPrice = recalculateFinalPrice(state);
		},
		setIncentives: (state) => {
			state.trim.incentivesChecked = !state.trim.incentivesChecked;
			state.finalPrice = recalculateFinalPrice(state);
		},
		setTrim: (state, action) => {
			state.trim.selectedTrim.name = action.payload.name;
			state.trim.selectedTrim.pricing =
				action.payload.pricing[state.trim.paymentType.toLowerCase()];
			state.finalPrice = recalculateFinalPrice(state);
		},
		setExterior: (state, action) => {
			state.exterior = action.payload;
			state.finalPrice = recalculateFinalPrice(state);
		},
		setInterior: (state, action) => {
			state.interior = action.payload;
			state.finalPrice = recalculateFinalPrice(state);
		},
		setRims: (state, action) => {
			state.rims = action.payload;
			state.finalPrice = recalculateFinalPrice(state);
		},
	},
});

export const {
	setModel,
	setTrim,
	setPaymentType,
	setIncentives,
	setExterior,
	setInterior,
	setRims,
} = pricingSlice.actions;

export default pricingSlice.reducer;
