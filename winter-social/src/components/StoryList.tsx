"use client";
import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import DotDotLoading from "./utilities/DotDotLoading";

type StoryWithUser = Story & {
	user: User;
};

const StoryList = ({
	stories,
	userId,
}: {
	stories: StoryWithUser[];
	userId: string;
}) => {
	const [storyList, setStoryList] = useState(stories);
	const [img, setImg] = useState<any>();

	const { user, isLoaded } = useUser();
	// if (!user && !isLoaded) return <DotDotLoading />;
	// if (!user && isLoaded) return null;

	const [optimisticStories, addOptimisticStory] = useOptimistic(
		storyList,
		(state, value: StoryWithUser) => [value, ...state]
	);

	const add = async () => {
		if (!img?.secure_url) return;

		addOptimisticStory({
			id: Math.random(),
			img: img.secure_url,
			createdAt: new Date(Date.now()),
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
			userId: userId,
			user: {
				id: userId,
				username: "Sending...",
				avatar: user?.imageUrl || "/noAvatar.png",
				cover: "",
				name: "",
				surname: "",
				description: "",
				city: "",
				school: "",
				work: "",
				website: "",
				createdAt: new Date(Date.now()),
			},
		});

		try {
			const createdStory = await addStory(img.secure_url);
			setStoryList((prev) => [createdStory, ...prev]);
			setImg(null);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	return (
		<>
			<CldUploadWidget
				uploadPreset="winter"
				onSuccess={(result, { widget }) => {
					setImg(result.info);
					widget.close();
				}}
			>
				{({ open }) => {
					return (
						<div

							className="flex flex-col items-center gap-2 cursor-pointer relative"
						>
							<Image
								src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
								alt="img"
								className="w-20 h-20 rounded-full ring-2 object-cover"
								width={80}
								height={80}
                onClick={() => open()}
							/>
							{img ? (
								<form action={add}>
									<button className="text-xs bg-blue-500 p-2 rounded-md text-white">
										send
									</button>
								</form>
							) : (
								<span className="font-medium">Add a Story</span>
							)}
							<div className="absolute text-6xl text-gray-100">+</div>
						</div>
					);
				}}
			</CldUploadWidget>

			{optimisticStories.map((story) => (
				<div
					className="flex flex-col items-center gap-2 cursor-pointer"
					key={story.id}
				>
					<Image
						src={story.img}
						alt="img"
						className="w-20 h-20 rounded-full ring-2"
						width={80}
						height={80}
					/>
					<span className="font-medium">
						{story.user.name || story.user.username}
					</span>
				</div>
			))}
		</>
	);
};

export default StoryList;
