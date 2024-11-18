import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
	const awaitedParams = await params;
	const _username = awaitedParams.username;

	const user = await prisma.user.findFirst({
		where: {
			username: _username,
		},
		include: {
			_count: {
				select: {
					followers: true,
					followings: true,
					posts: true,
				},
			},
		},
	});

	//console.log(`Profile page User : ${JSON.stringify(user)}`);

	if (!user) return notFound();

	// const authObj = await auth();
	// console.log(`authObj : ${JSON.stringify(authObj)}`);
	/* 
	const { userId: currentUserId } takes the userId property from the object returned by auth() and assigns its value to a new constant variable named currentUserId.
	If auth() returns { userId: 'abc123', name: 'John' }, currentUserId will be assigned 'abc123'.

	*/
	const { userId: currentUserId } = await auth();

	let isBlocked: boolean;

	if (currentUserId) {
		const result = await prisma.block.findFirst({
			where: {
				blockerId: user.id,
				blockedId: currentUserId,
			},
		});

		if (result) isBlocked = true;
		else isBlocked = false;
	} else {
		isBlocked = false;
	}

	if (isBlocked) return notFound();

	return (
		<div className="flex gap-6 pt-3">
			<div className="hidden xl:block w-[20%]">
				<LeftMenu type="profile" />
			</div>
			<div className="w-full lg:w-[70%] xl:w-[50%]">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center justify-center">
						<div className="w-full h-64 relative">
							<Image
								src={user.cover || "/noCover.png"}
								alt=""
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover rounded-md"
							/>
							<Image
								src={user.avatar || "/noAvatar.png"}
								alt=""
								width={128}
								height={128}
								className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto 
								-bottom-16 ring-4 ring-white object-cover"
							/>
						</div>
						<h1 className="mt-20 mb-4 text-2xl font-medium  text-gray-500">
							{user.name && user.surname
								? `${user.name} ${user.surname}`
								: user.username}
						</h1>
						<div className="flex items-center font-medium  text-gray-500 justify-center gap-12 mb-4">
							<div className="flex flex-col items-center">
								<span className="">{user._count.posts}</span>
								<span className="text-sm">Posts</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="">{user._count.followers}</span>
								<span className="text-sm">Followers</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="">{user._count.followings}</span>
								<span className="text-sm">Following</span>
							</div>
						</div>
					</div>
					<Feed username={user.username}/>
				</div>
			</div>
			<div className="hidden lg:block w-[30%]">
				<RightMenu user={user} />
			</div>
		</div>
	);
};

export default ProfilePage;
