import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

// This is using the intersection type (&), which combines two type definitions into one.
type RequestWithUser = FollowRequest & {
	sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
	if (requests.length === 0) {
		return (
			<div className="self-center text-gray-500 font-semibold">
				<span>You have no friend requests ...</span>
			</div>
		);
	}
  
	return (
		<div className="">
			{requests.map((request) => (
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
						<Image
							src="/accept.png"
							alt="accept"
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							src="/reject.png"
							alt="reject"
							width={20}
							height={20}
							className="cursor-pointer"
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default FriendRequestList;
