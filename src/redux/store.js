import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./slices/favoritesSlice";
import initialTableSlice from "./slices/initialTableSlice";
import isLoggedInSlice from "./slices/isLoggedInSlice";
import whatIsSelectedSlice from "./slices/whatIsSelectedSlice";

const reducer = {
	favoriteList: favoritesSlice,
	logIn: isLoggedInSlice,
	whatToShow: whatIsSelectedSlice,
	initialTable: initialTableSlice,
};

export const store = configureStore({
	reducer,
});
