import Image from "next/image";
import Link from "next/link";
import React from "react";

const Birthdays = () => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
			{/* TOP  */}
			<div className="flex justify-between items-center font-medium">
				<span className="text-gray-500">Birthdays</span>
			</div>
			{/* USERS  */}
			<div className="flex items-center justify-between rounded">
				<div className="flex items-center gap-4">
					<Image
						src="/img/girl_1.jpg"
						alt=""
						width={40}
						height={40}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<span className="font-semibold">Nushu</span>
				</div>
				<div className="flex gap-3 justify-end">
					<button className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md">
						Celebrate
					</button>
				</div>
			</div>
			<div className="flex items-center justify-between rounded">
				<div className="flex items-center gap-4">
					<Image
						src="/img/girl_2.jpg"
						alt=""
						width={40}
						height={40}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<span className="font-semibold">Rohani</span>
				</div>
				<div className="flex gap-3 justify-end">
					<button className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md">
						Celebrate
					</button>
				</div>
			</div>
			{/* UPCOMING  */}
			<div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
				<Image src="/gift.png" alt="" width={24} height={24} />
				<Link href="/" className="flex flex-col gap-1 text-xs">
					<span className="text-gray-700 font-semibold">
						Upcoming birthdays
					</span>
					<span className="text-gray-500">
						See others next 16 have upcoming birthdays ...
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Birthdays;
