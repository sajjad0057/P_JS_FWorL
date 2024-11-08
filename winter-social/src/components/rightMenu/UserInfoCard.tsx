import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserInfoCardInterAction from "./UserInfoCardInterAction";

const UserInfoCard = async ({ user }: { user: User }) => {
	const createdAtDate = new Date(user.createdAt);
	const formattedDate = createdAtDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	let isUserBlocked: boolean = false;
	let isFollowing: boolean = false;
	let isFollowingReqSent: boolean = false;

	const { userId: currentUserId } = await auth();

	if (currentUserId) {
		const blockResult = await prisma.block.findFirst({
			where: {
				blockerId: currentUserId,
				blockedId: user.id,
			},
		});

		blockResult ? (isUserBlocked = true) : (isUserBlocked = false);

		const followResult = await prisma.follower.findFirst({
			where: {
				followerId: currentUserId,
				followingId: user.id,
			},
		});

		followResult ? (isFollowing = true) : (isFollowing = false);

		const followReqResult = await prisma.followRequest.findFirst({
			where: {
				senderId: currentUserId,
				receiverId: user.id,
			},
		});

		followReqResult
			? (isFollowingReqSent = true)
			: (isFollowingReqSent = false);
	}

	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
			{/* TOP  */}
			<div className="flex justify-between items-center font-medium">
				<span className="text-gray-500">User Informations</span>
				<Link href="/" className="text-blue-500 text-xs">
					See All
				</Link>
			</div>
			{/* BOTTOM  */}
			<div className="flex flex-col gap-4 text-gray-500">
				<div className="flex items-center gap-2">
					<span className="text-xl font-bold">
						{user.name && user.surname
							? `${user.name} ${user.surname}`
							: user.username}
					</span>
					<span className="text-sm">@{user.username}</span>
				</div>
				{user.description && <p>{user.description}</p>}
				{user.city && (
					<div className="flex item-cemter gap-2">
						<Image src="/map.png" alt="map" width={16} height={16} />
						<span>
							Living in <b>{user.city}</b>
						</span>
					</div>
				)}
				{user.school && (
					<div className="flex item-cemter gap-2">
						<Image src="/school.png" alt="map" width={16} height={16} />
						<span>
							Went to <b>{user.school}</b>
						</span>
					</div>
				)}

				{user.work && (
					<div className="flex item-cemter gap-2">
						<Image src="/work.png" alt="map" width={16} height={16} />
						<span>
							Work at <b>{user.work}</b>
						</span>
					</div>
				)}
				<div className="flex items-center justify-between">
					{user.website && (
						<div className="flex gap-1 items-center">
							<Image src="/link.png" alt="" width={16} height={16} />
							<Link href={user.website} className="text-blue-500 font-medium">
								{user.name && user.surname
									? `${user.name} ${user.surname}`
									: user.username}
							</Link>
						</div>
					)}
					<div className="flex gap-1 items-center">
						<Image src="/date.png" alt="" width={16} height={16} />
						<span>Joined {formattedDate}</span>
					</div>
				</div>
				<UserInfoCardInterAction
					userId={user.id}
					currentUserId={currentUserId}
					isUserBlocked={isUserBlocked}
					isFollowing = {isFollowing}
					isFollowingReqSent = {isFollowingReqSent}

				/>
			</div>
		</div>
	);
};

export default UserInfoCard;
