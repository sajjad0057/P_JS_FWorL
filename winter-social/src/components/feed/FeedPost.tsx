import Image from "next/image";
import React from "react";
import Comments from "./Comments";
import { Post, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type FeedPostType = Post & { user: User } & { likes: [{ userId: string }] } & {
	_count: { comments: number };
};

const FeedPost = ({ post }: { post: FeedPostType }) => {
	return (
		<div className="flex flex-col gap-4">
			{/* USER  */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Image
						src={post.user.avatar || "/noAvatar.png"}
						width={40}
						height={40}
						alt=""
						className="w-10 h-10 rounded-full"
					/>
					<span className="font-medium">
						{post.user.name && post.user.surname
							? `${post.user.name} ${post.user.surname}`
							: post.user.username}
					</span>
				</div>
				<Image src="/more.png" width={16} height={16} alt="" />
			</div>
			{/* DESC  */}
			<div className="flex flex-col gap-4">
				{post.img && (
					<div className="w-full min-h-96 relative">
						<Image
							src={post.img}
							alt="image"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover rounded-md"
						/>
					</div>
				)}
				{post.desc && <p>{post.desc}</p>}
			</div>
			{/* INTERACTION  */}
			<PostInteraction
				postId={post.id}
				likes={post.likes.map((like) => like.userId)}
				commentNumber={post._count.comments}
			/>
			<Comments />
		</div>
	);
};

export default FeedPost;
