import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoriteSlice = createSlice({
	name: "Favorite Slice",
	initialState,
	reducers: {
		addFavoriteName(state, action) {
			state.push(action.payload);
		},
		removeFavoriteName(state, action) {
			return (state = state.filter((item) => item !== action.payload));
		},
	},
});

export const { addFavoriteName, removeFavoriteName } = favoriteSlice.actions;
export default favoriteSlice.reducer;
