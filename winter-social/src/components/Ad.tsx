import Image from "next/image";
import React from "react";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm">
			{/* TOP  */}
			<div className="flex items-center justify-between text-gray-500 font-medium">
				<span>Sponsored Ads</span>
				<Image
					src="/more.png"
					alt=""
					width={16}
					height={16}
					className="cursor-pointer"
				/>
			</div>
			{/* BOTTOM  */}
			<div
				className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
			>
				<div
					className={`relative w-full ${
						size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
					}`}
				>
					<Image
						src="/img/ad_img_4.jpg"
						alt="ad img"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						quality={75}
						className="cursor-pointer rounded-lg object-cover"
					/>
				</div>
				<div className="flex items-center gap-4">
					<Image
						src="/img/ad_img_4.jpg"
						alt="ad img"
						width={24}
						height={24}
						className="cursor-pointer rounded-full w-6 h-6"
					/>
					<span className="text-blue-500 font-medium">Add your ads here.</span>
				</div>
				<p className={`text-gray-500 ${size === "sm" ? "text-xs" : "text-sm"}`}>
					{size === "sm"
						? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. sit amet consectetur..."
						: size === "md"
						? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. sit amet consectetur..."
						: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. sit amet consectetur..."}
				</p>
				<button className="bg-gray-200 text-gray-400 p-2 text-xs rounded-lg">Learn more ..</button>
			</div>
		</div>
	);
};

export default Ad;
