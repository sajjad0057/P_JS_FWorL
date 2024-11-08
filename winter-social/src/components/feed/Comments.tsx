import Image from "next/image";
import React from "react";

const Comments = () => {
	return (
		<div className="">
			{/* WRITE   */}
			<div className="flex item-center gap-4">
				<Image
					src="/img/face_colors.jpg"
					alt=""
					className="w-8 h-8 rounded-full"
					width={30}
					height={30}
				/>
				<div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
					<input
						type="text"
						placeholder="Write a comment..."
						className="bg-transparent outline-none"
					/>
					<Image
						src="/emoji.png"
						alt=""
						width={16}
						height={16}
						className="cursor-pointer"
					/>
				</div>
			</div>
			{/* COMMENTS  */}
			<div className="">
				{/* COMMENT  */}
				<div className="flex gap-4 justify-between mt-6">
					{/* AVATER  */}
					<Image
						src="/img/bw_boys.png"
						alt=""
						className="w-8 h-8 rounded-full"
						width={30}
						height={30}
					/>
					{/* DESC  */}
					<div className="flex flex-col gap-2 flex-1">
						<span className="font-medium">Zibon</span>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
							debitis dolores? Aut sequi doloribus alias culpa quae laboriosam
							temporibus? Ullam harum vero officia id nemo necessitatibus,
							maiores veritatis doloribus porro!
						</p>
						<div className="flex items-center gap-8 text-xs text-gray-500">
							<div className="flex items-center gap-4">
								<Image
									src="/like.png"
									alt=""
									width={16}
									height={16}
									className="cursor-pointer w-4 h-4"
								/>
								<span className="text-gray-300">|</span>
								<span className="text-gray-500"> 18 Likes</span>
							</div>
							<div className=""> Reply</div>
						</div>
					</div>
					{/* ICON  */}
						<Image
							src="/more.png"
							alt=""
							width={16}
							height={16}
							className="cursor-pointer w-4 h-4"
						/>
				</div>
			</div>
		</div>
	);
};

export default Comments;
