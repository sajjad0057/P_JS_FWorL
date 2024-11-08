"use client";
import { switchFollow } from "@/lib/actions";
import React, { useOptimistic, useState } from "react";

const UserInfoCardInterAction = ({
	userId,
	currentUserId,
	isUserBlocked,
	isFollowing,
	isFollowingReqSent,
}: {
	userId: string;
	currentUserId: string;
	isUserBlocked: boolean;
	isFollowing: boolean;
	isFollowingReqSent: boolean;
}) => {
	const [userState, setuserState] = useState({
		following: isFollowing,
		blocked: isUserBlocked,
		followingRequestSent: isFollowingReqSent,
	});

	const follow = async () => {
		try {
			await switchFollow(userId);
			setuserState((prev) => ({
				...prev,
				following: prev.following && false,
				followingRequestSent:
					!prev.following && !prev.followingRequestSent ? true : false,
			}));
		} catch (err) {
			console.log(`Error from : ${JSON.stringify(err)}`);
			throw new Error("Error occured from UserInfoCardInterAction Component");
		}
	};

	return (
		<>
			<form action={follow} className="">
				<button className="bg-blue-500 w-full text-white text-sm rounded-md p-1">
					{userState.following
						? "Followïng"
						: userState.followingRequestSent
						? "Friend Request Sent"
						: "Follow"}
				</button>
			</form>
			<form action="" className="self-end">
				<span className="text-orange-400  text-xs cursor-pointer px-2">
					{userState.blocked ? "UnBlock User" : "Block User"}
				</span>
			</form>
		</>
	);
};

export default UserInfoCardInterAction;
