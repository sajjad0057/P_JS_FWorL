"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

// This is using the intersection type (&), which combines two type definitions into one.
type RequestWithUser = FollowRequest & {
	sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
	const [requestState, setrequestState] = useState(requests);

	const accept = async (requestId: number, userId: string) => {
		removeOptimisticRequests(requestId);
		try {
			await acceptFollowRequest(userId);
			setrequestState((prev) => prev.filter((req) => req.id !== requestId));
		} catch (err) {}
	};

	const decline = async (requestId: number, userId: string) => {
		removeOptimisticRequests(requestId);
		try {
			await declineFollowRequest(userId);
			setrequestState((prev) => prev.filter((req) => req.id !== requestId));
		} catch (err) {}
	};

	const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
		requestState,
		(state, value: number) => state.filter((req) => req.id !== value)
	);

	// if (requests.length === 0) {
	// 	return (
	// 		<div className="self-center text-gray-500 font-semibold">
	// 			<span>You have no friend requests available...</span>
	// 		</div>
	// 	);
	// }

	return (
		<div className="">
			{optimisticRequests.map((request) => (
				<div
					className="flex items-center justify-between rounded"
					key={request.id}
				>
					<div className="flex items-center gap-4">
						<Image
							src={request.sender.avatar || "noAvatar.png"}
							alt="avater"
							width={40}
							height={40}
							className="w-10 h-10 rounded-full object-cover"
						/>
						<span className="font-semibold">
							{request.sender.name && request.sender.surname
								? `${request.sender.name} ${request.sender.surname}`
								: request.sender.username}
						</span>
					</div>
					<div className="flex gap-3 justify-end">
						<form action={() => accept(request.id, request.sender.id)}>
							<button>
								<Image
									src="/accept.png"
									alt="accept"
									width={20}
									height={20}
									className="cursor-pointer"
								/>
							</button>
						</form>
						<form action={() => decline(request.id, request.sender.id)}>
							<button>
								<Image
									src="/reject.png"
									alt="reject"
									width={20}
									height={20}
									className="cursor-pointer"
								/>
							</button>
						</form>
					</div>
				</div>
			))}
		</div>
	);
};

export default FriendRequestList;
