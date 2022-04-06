import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	page: "HOME",
	id: null,
};

const whatIsSelectedSlice = createSlice({
	name: "Change Table",
	initialState,
	reducers: {
		whatToShow(state, action) {
			return action.payload;
		},
	},
});

export const { whatToShow } = whatIsSelectedSlice.actions;
export default whatIsSelectedSlice.reducer;
