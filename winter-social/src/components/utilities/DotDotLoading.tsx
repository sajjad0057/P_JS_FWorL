import React from "react";

const DotDotLoading = () => {
	return (
		<div className="flex space-x-2 justify-center items-center rounded-lg dark:invert pt-2">
			<span className="sr-only">Loading...</span>
			<div className="h-4 w-4 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
			<div className="h-4 w-4 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
			<div className="h-4 w-4 bg-gray-300 rounded-full animate-bounce"></div>
		</div>
	);
};

export default DotDotLoading;
