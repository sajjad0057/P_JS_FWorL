import React, { Suspense } from "react";
import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Ad from "./Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";
import DotDotLoading from "./utilities/DotDotLoading";

const RightMenu = ({ user }: { user?: User }) => {
	return (
		<div className="flex flex-col gap-6">
			{user ? (
				<>
					<Suspense fallback={<DotDotLoading/>}>
						<UserInfoCard user={user} />
					</Suspense>
					<Suspense fallback={<DotDotLoading/>}>
						<UserMediaCard user={user} />
						<DotDotLoading/>
					</Suspense>

				</>
			) : null}
			<FriendRequests />
			<Birthdays />
			<Ad size="md" />
		</div>
	);
};

export default RightMenu;

/*
{ userId } : {userId? : string} means : 
interface RightMenuProps {
  userId?: string;
}

{ userId } : RightMenuProps

*/
