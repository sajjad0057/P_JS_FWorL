import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMediaCard = ({ userId }: { userId?: string }) => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
			{/* TOP  */}
			<div className="flex justify-between items-center font-medium">
				<span className="text-gray-500">User Media</span>
				<Link href="/" className="text-blue-500 text-xs">
					See All
				</Link>
			</div>
			{/* BOTTOM  */}
			<div className="flex gap-4 justify-evenly flex-wrap">
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/colorful_leaf.jpg"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/female_1.jpg"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/colors.png"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/girl_3.jpg"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/colorfull_bird.jpg"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/girl_4.jpg"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
				<div className="relative w-1/5 h-24">
					<Image
						src="/img/girl_2.jpg"
						alt="img"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="object-cover rounded-md"
					/>
				</div>
			</div>
		</div>
	);
};

export default UserMediaCard;
