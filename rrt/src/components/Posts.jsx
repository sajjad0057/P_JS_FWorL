import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";

const Posts = () => {
	const { posts, isLoading, isError, error } = useSelector(
		(state) => state.posts
	);

	//console.log(posts, isLoading, isError, error);
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	// decide what to render

	let content;

	if (isLoading) {
		content = (
			<div className="flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}
	if (!isLoading && isError) {
		content = (
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong className="font-bold">Error:</strong>
				<span className="block sm:inline ml-2">{error}</span>
			</div>
		);
	}

	if (!isLoading && !isError && posts.length === 0) {
		content = <h1>No post found!</h1>;
	}

	if (!isLoading && !isError && posts.length > 0) {
		content = (
			<ul>
				{posts.map((p) => (
					<li key={p.id}>{p.title}</li>
				))}
			</ul>
		);
	}

	return <div>{content}</div>;
};
export default Posts;
