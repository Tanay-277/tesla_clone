import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	img: "/images/model-y-stealth-grey.jpg",
};

const imgSlice = createSlice({
	name: "img",
	initialState,
	reducers: {
		setImg: (state, action) => {
			state.img = action.payload;
		},
	},
});

export const { setImg } = imgSlice.actions;
export default imgSlice.reducer;
