import prisma from "@/lib/client";
import { User } from "@prisma/client";
import { Span } from "next/dist/trace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMediaCard = async ({ user }: { user: User }) => {
	console.log(`User Media Card  : ${JSON.stringify(user)}`)
	
	const postsWithMedia = await prisma.post.findMany({
		where: {
			userId: user.id,
			img: {
				not: null,
			},
		},
		take: 8,
		orderBy: {
			createdAt: "desc",
		},
	});

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
				{postsWithMedia.length
					? postsWithMedia.map((post) => (
							<div className="relative w-1/5 h-24" key={post.id}>
								<Image
									src= {post.img ? post.img : "/img/nature_1.jpg"}
									alt="img"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									fill
									className="object-cover rounded-md"
								/>
							</div>
					  ))
					: (<span className="text-gray-500 font-semibold text-sm">No media files available</span>)}
			</div>
		</div>
	);
};

export default UserMediaCard;
