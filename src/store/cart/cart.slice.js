import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		toggleProduct: (state, { payload: product }) => {
			const ifExist = state.some((i) => i === product);

			if (ifExist) {
				const index = state.findIndex((i) => i === product);
				if (index !== -1) state.splice(index, 1);
			} else state.push(product);
		},
	},
});

export const { actions, reducer } = cartSlice;
