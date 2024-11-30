import { configureStore } from "@reduxjs/toolkit";

import pricingReducer from "../features/configurator/pricingSlice";

export const store = configureStore({
	reducer: {
		pricing: pricingReducer,
	},
});
