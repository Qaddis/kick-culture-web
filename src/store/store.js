import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { reducer as cartReducer } from "./cart/cart.slice";
import { reducer as burgerReducer } from "./burger/burger.slice";

const reducers = combineReducers({
	cart: cartReducer,
	burger: burgerReducer,
});

export const store = configureStore({
	reducer: reducers,
});
