import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isLoggedIn = createSlice({
	name: "LogIn",
	initialState,
	reducers: {
		logIn(state, action) {
			return (state = action.payload);
		},
	},
});

export const { logIn } = isLoggedIn.actions;
export default isLoggedIn.reducer;
