import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

const Stories = async () => {
	const { userId: currentUserId } = await auth();

	if (!currentUserId) return null;

	// expiresAt: { gt: new Date() } এখানে expiresAt ফিল্ডের মান বর্তমানে সময় (new Date()) এর চেয়ে বড় হতে হবে।
	//অর্থাৎ, expiresAt ফিল্ডটি ভবিষ্যতের সময় নির্দেশ করবে। [gt stands for "greater than"]
	//OR: এই শর্তটি বলে, পরবর্তী যেকোনো একটি শর্ত মিললেই ডেটা নেওয়া হবে.

	const stories = await prisma.story.findMany({
		where: {
			expiresAt: {
				gt: new Date(),
			},
			OR: [
				{
					user: {
						followers: {
							some: {
								followerId: currentUserId,
							},
						},
					},
				},
				{
					userId: currentUserId,
				}
			],
		},
		include: {
			user: true
		}
	});

	return (
		<div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
			<div className="flex gap-8 w-max">
				<StoryList stories = {stories} userId = {currentUserId}/>
			</div>
		</div>
	);
};

export default Stories;
