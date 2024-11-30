import { ModelX, ModelY, CyberTruck } from "../pages";
import { Vehicles, CustomizationButtons } from ".";

const paymentMethods = ["Cash", "Lease", "Finance"];

const validModels = [
	{ name: "modely", component: ModelY },
	{ name: "modelx", component: ModelX },
	{ name: "cybertruck", component: CyberTruck },
];

const getModelDetails = (modelName) => {
	const model = Vehicles[modelName];
	if (!model) {
		return "Model not found";
	}
	return model;
};

const getOptions = (modelName, optionType) => {
	const model = getModelDetails(modelName);
	if (!model) {
		return "Model not found";
	}

	return Object.keys(model.images[optionType]);
};

const generateCustomizationCatalog = (modelName) => {
	const model = getModelDetails(modelName);
	if (!model) {
		return "Model not found";
	}

	const catalog = {
		exterior: getOptions(modelName, "exterior"),
		rims: getOptions(modelName, "rims"),
		interior: getOptions(modelName, "interior"),
	};

	return catalog;
};

const getCustomizationButtons = (modelName, optionType, catalog) => {
	const model = getModelDetails(modelName);
	if (!model) {
		return "Model not found";
	}
	const allButtons = Object.keys(CustomizationButtons[optionType]);
	const availableButtons = allButtons.filter((button) =>
		catalog[optionType]?.includes(button)
	);

	const availableOptions = availableButtons.map((button) => ({
		...CustomizationButtons[optionType][button],
		name: CustomizationButtons[optionType][button].name || button,
	}));

	return availableOptions;
};

const decodeModelName = (modelName) => {
	if (!modelName.includes("model")) return modelName;
	return "Model " + modelName[modelName.length - 1].toUpperCase();
};

const decodeOption = (option) => {
	// console.log("Option", option);
	const decodedWord = option
		.split("_")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
	// console.log("Decoded Word", decodedWord);
	return decodedWord;
};

const calculatePriceWithIncentives = (
	paymentType,
	price,
	incentives,
	incentivesChecked
) => {
	if (paymentType === "Finance") return price;
	if (!incentivesChecked || !incentives) return price;
	const { federal = 0, gasSavings = 0 } = incentives;
	return price - (federal + gasSavings);
};

const generateFinalCustomizationReport = (
	modelName,
	exterior,
	rims,
	interior
) => {
	const model = getModelDetails(modelName);
	if (!model) {
		return "Model not found";
	}

	const finalReport = {
		model: model.name,
		paymentDetails,
		exterior,
		rims,
		interior,
	};

	return finalReport;
};

export {
	paymentMethods,
	validModels,
	getModelDetails,
	getOptions,
	generateCustomizationCatalog,
	getCustomizationButtons,
	decodeModelName,
	decodeOption,
	generateFinalCustomizationReport,
	calculatePriceWithIncentives,
};
