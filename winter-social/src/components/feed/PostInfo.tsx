"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
	const [open, setOpen] = useState(false);
	const deletePostWithId = deletePost.bind(null, postId);
	return (
		<div className="relative">
			<Image
				src="/more.png"
				width={16}
				height={16}
				alt="..."
        className="cursor-pointer"
				onClick={() => setOpen((prev) => !prev)}
			/>
			{open && (
				<div className="absolute text-gray-500 text-xs font-bold top-4 right-0
         bg-white w-32 p-4 rounded-lg flex flex-col items-center gap-2 shadow-lg z-30">
					<span className="cursor-pointer hover:bg-slate-200 rounded-md px-3 py-1 border-b-1 border-gray-50">
						View
					</span>
          <hr />
					<span className="cursor-pointer hover:bg-slate-200 rounded-md px-3 py-1 border-b-1 border-gray-50">
						Re-post
					</span>
          <hr />
					<form
						action={deletePostWithId}
						className="hover:bg-slate-200 rounded-md"
					>
						<button className="text-red-500 px-3 py-1">Delete</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default PostInfo;
