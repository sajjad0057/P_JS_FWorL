import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const AddPost = async () => {
	const { userId } = await auth();
	//console.log(userId);
	const testAction = async (formData: FormData) => {
		"use server";
		if (!userId) return;

		const desc = formData.get("desc") as string;

		if (desc === null || desc === "" || desc === undefined) return;
		
		try {
			const res = await prisma.post.create({
				data: {
					userId: userId,
					desc: desc,
				},
			});

			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
			{/* AVATER */}
			<Image
				src="/img/face_colors.jpg"
				alt=""
				width={48}
				height={48}
				className="w-12 h-12 object-cover rounded-full"
			/>
			{/*POST */}
			<div className="flex-1">
				{/* TEXT INPUT */}
				<form action={testAction} className="flex gap-4">
					<textarea
						placeholder="What's on your mind"
						className="flex-1 bg-slate-100 rounded-lg p-2"
						name="desc"
					></textarea>
					<Image
						src="/emoji.png"
						alt=""
						width={20}
						height={20}
						className="w-5 h-5 cursor-pointer self-end"
					/>
					<button className="rounded-md bg-blue-500 text-white font-semibold px-4">
						Post
					</button>
				</form>
				{/* POST OPTIONS */}
				<div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/addimage.png" alt="" width={20} height={20} />
						<span>Photo</span>
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/addVideo.png" alt="" width={20} height={20} />
						<span>Video</span>
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/addevent.png" alt="" width={20} height={20} />
						<span>Event</span>
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/poll.png" alt="" width={20} height={20} />
						<span>Poll</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPost;
