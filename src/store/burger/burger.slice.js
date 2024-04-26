import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
	name: "burger",
	initialState: {
		value: false,
	},
	reducers: {
		toggleBurger: (state) => {
			state.value = !state.value;
		},
	},
});

export const { actions, reducer } = burgerSlice;
