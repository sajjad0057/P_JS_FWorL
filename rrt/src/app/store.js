import { configureStore } from "@reduxjs/toolkit";
import countersReducer from "../features/counters/countersSlice";
import postsReducer from "../features/posts/postsSlice";

const store = configureStore({
	reducer: {
		counters: countersReducer,
		posts: postsReducer,

		// To add another slice, register its reducer here in the store.
	},
});

export default store;
