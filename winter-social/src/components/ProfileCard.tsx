import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const ProfileCard = async () => {
	const { userId } = await auth();

	if (!userId) return null;

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
		include: {
			_count: {
				select: {
					followers: true,
				},
			},
		},
	});

	//console.log(`profile card page user : ${JSON.stringify(user)}`);

	if (!user) return null;

	return (
		<div className="p-3 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
			<div className="h-20 relative">
				<Image
					src={user?.cover || "/noCover_2.png"}
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="rounded-md object-cover"
				/>
				<Image
					src={user?.avatar || "/noAvatar.png"}
					alt=""
					height={48}
					width={48}
					className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-2 ring-white z-10"
				/>
			</div>
			<div className="flex flex-col gap-2 items-center">
				<span className="font-semibold">
					{user.name && user.surname
						? `${user.name} ${user.surname}`
						: user.username}
				</span>
				<div className="flex items-center gap-2">
					<div className="flex gap-1">
						<Image
							src="/img/emoji_crying.jpg"
							alt=""
							height={12}
							width={12}
							className="rounded-full object-cover w-3 h-3 "
						/>
						<Image
							src="/img/colorful_leaf.jpg"
							alt=""
							height={12}
							width={12}
							className="rounded-full object-cover w-3 h-3 "
						/>
						<Image
							src="/img/female_1.jpg"
							alt=""
							height={12}
							width={12}
							className="rounded-full object-cover w-3 h-3 "
						/>
					</div>
					<span className="text-sm font-semibold text-gray-500">
						{user._count.followers} Followers
					</span>
				</div>
			</div>
			<button className="bg-blue-500 text-white text-xs rounded-lg p-2">
				My Profile
			</button>
		</div>
	);
};

export default ProfileCard;
