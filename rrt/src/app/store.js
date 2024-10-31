import { configureStore } from "@reduxjs/toolkit";
import countersReducer from "../features/counters/countersSlice";

const store = configureStore({
	reducer: {
		counters: countersReducer,

    // To add another slice, register its reducer here in the store.
	},
});

export default store;
