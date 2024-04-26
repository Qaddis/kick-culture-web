import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { actions as cartActions } from "../store/cart/cart.slice";
import { actions as burgerAcions } from "../store/burger/burger.slice";

const rootActions = {
	...cartActions,
	...burgerAcions,
};

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
