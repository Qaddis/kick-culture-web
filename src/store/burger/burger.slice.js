import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
	name: "burger",
	initialState: {
		value: true,
	},
	reducers: {
		toggleBurger: (state) => {
			state.value = !state.value;
		},
	},
});

export const { actions, reducer } = burgerSlice;
