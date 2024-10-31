import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./postsAPI";

const initialState = {
	posts: [],
	isLoading: false,
	isError: false,
	error: null,
};

export const fetchPosts = createAsyncThunk("posts/getPosts", async () => {
	return await getPosts();
});

const postsSlice = createSlice({
	name: "posts",
	initialState,

	//// To handle asynchronous actions, use extraReducers instead of reducers
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.error = action.error?.message;
			});
	},
});

export default postsSlice.reducer;
