import React from "react";

const Stats = ({ totalCount }) => {
	return (
		<div className="flex items-center justify-center bg-gray-100">
			<div className="flex items-center justify-center w-48 h-48  bg-slate-200 text-slate-700 font-bold text-center text-md rounded-full">
				TotalCount: {totalCount}
			</div>
		</div>
	);
};

export default Stats;
