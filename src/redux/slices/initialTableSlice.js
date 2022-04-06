import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	symbolData: [],
};

const initialTableSlice = createSlice({
	name: "Initial Table",
	initialState,
	reducers: {
		addSymbol(state, action) {
			state.symbolData.push(action.payload);
		},
		updateSymbol(state, action) {
			state.symbolData = state.symbolData.map((each) =>
				each.name === action.payload.name
					? {
							...each,
							...action.payload,
					  }
					: {
							...each,
					  }
			);
		},
		toggleFavorite(state, action) {
			state.symbolData = state.symbolData.map((each) =>
				each.name === action.payload.name
					? {
							...each,
							isFavorite: !each.isFavorite,
					  }
					: {
							...each,
					  }
			);
		},
	},
});

export const { addSymbol, updateSymbol, toggleFavorite } =
	initialTableSlice.actions;
export default initialTableSlice.reducer;
