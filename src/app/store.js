import { configureStore } from "@reduxjs/toolkit";

import pricingReducer from "../features/configurator/pricingSlice";
import imgReducer from "../features/configurator/imgSlice";
import listenerMiddleware from "../features/middleware/listenerMiddleware";

export const store = configureStore({
	reducer: {
		pricing: pricingReducer,
		img: imgReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});