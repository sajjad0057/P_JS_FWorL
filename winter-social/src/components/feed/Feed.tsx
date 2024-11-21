import React from "react";
import FeedPost from "./FeedPost";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { Span } from "next/dist/trace";

const Feed = async ({ username }: { username?: string }) => {
	const { userId } = await auth();

	let posts: any[] = [];

	if (username) {
		posts = await prisma.post.findMany({
			where: {
				user: {
					username: username,
				},
			},
			include: {
				user: true,
				likes: {
					select: {
						userId: true,
					},
				},
				_count: {
					select: {
						comments: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	if (!username && userId) {
		const following = await prisma.follower.findMany({
			where: {
				followerId: userId,
			},
			select: {
				followingId: true,
			},
		});

		const followingIds = following.map((f) => f.followingId);
		console.log(followingIds);

		posts = await prisma.post.findMany({
			where: {
				userId: {
					in: [userId, ...followingIds], ///এটি শুধুমাত্র সেই পোস্টগুলো ফেচ করবে, যেগুলোর userId, followingIds অ্যারের মধ্যে আছে।
				},
			},
			include: {
				user: true,
				likes: {
					select: {
						userId: true,
					},
				},
				_count: {
					select: {
						comments: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	return (
		<div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
			{posts.length ? (
				posts.map((post) => <FeedPost key={post.id} post={post} />)
			) : (
				<span className="m-auto text-gray-500 font-semibold text-sm">
					No posts found..!
				</span>
			)}
		</div>
	);
};

export default Feed;
