"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
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
		switchOptimisticState("follow");
		try {
			await switchFollow(userId);
			setuserState((prev) => ({
				...prev,
				following: prev.following && false,
				followingRequestSent:
					!prev.following && !prev.followingRequestSent ? true : false,
			}));
		} catch (err) {
			console.log(
				`Error from  UserInfoCardInterAction Component: ${JSON.stringify(err)}`
			);
			//throw new Error("Error occured from UserInfoCardInterAction Component");
		}
	};

	const block = async () => {
		switchOptimisticState("block");
		try {
			await switchBlock(userId);
			setuserState((prev) => ({
				...prev,
				blocked: !prev.blocked,
			}));
		} catch (err) {
			console.log(
				`Error from  UserInfoCardInterAction Component: ${JSON.stringify(err)}`
			);
			//throw new Error("Error occured from UserInfoCardInterAction Component");
		}
	};

	const [optimisticState, switchOptimisticState] = useOptimistic(
		userState,
		(state, value: "follow" | "block") =>
			value === "follow"
				? {
						...state,
						following: state.following && false,
						followingRequestSent:
							!state.following && !state.followingRequestSent ? true : false,
				  }
				: { ...state, blocked: !state.blocked }
	);

	return (
		<>
			<form action={follow} className="">
				<button className="bg-blue-500 w-full text-white text-sm rounded-md p-1">
					{optimisticState.following
						? "Followïng"
						: optimisticState.followingRequestSent
						? "Friend Request Sent"
						: "Follow"}
				</button>
			</form>
			<form action={block} className="self-end">
				<button>
					<span className="text-orange-400  text-xs cursor-pointer px-2">
						{optimisticState.blocked ? "Unblock User" : "Block User"}
					</span>
				</button>
			</form>
		</>
	);
};

export default UserInfoCardInterAction;
