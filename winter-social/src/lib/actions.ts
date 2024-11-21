"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Handle User Following and Unfollow
export const switchFollow = async (userId: string) => {
	const { userId: currentUserId } = await auth();

	if (!currentUserId) {
		throw new Error("User is not authenticated !");
	}

	try {
		const existingFollow = await prisma.follower.findFirst({
			where: {
				followerId: currentUserId,
				followingId: userId,
			},
		});

		if (existingFollow) {
			await prisma.follower.delete({
				where: {
					id: existingFollow.id,
				},
			});
		} else {
			const existingFollowRequest = await prisma.followRequest.findFirst({
				where: {
					senderId: currentUserId,
					receiverId: userId,
				},
			});
			if (existingFollowRequest) {
				await prisma.followRequest.delete({
					where: {
						id: existingFollowRequest.id,
					},
				});
			} else {
				await prisma.followRequest.create({
					data: {
						senderId: currentUserId,
						receiverId: userId,
					},
				});
			}
		}
	} catch (err) {
		console.log(
			`Error from action.ts -> switchFollow : ${JSON.stringify(err)}`
		);
		throw new Error(
			"Something went wrong from switchFollow -> action.ts file !"
		);
	}
};

// handle user blocking or unblocking
export const switchBlock = async (userId: string) => {
	const { userId: currentUserId } = await auth();

	if (!currentUserId) {
		throw new Error("User is not authenticated !");
	}

	try {
		const existingBlock = await prisma.block.findFirst({
			where: {
				blockerId: currentUserId,
				blockedId: userId,
			},
		});

		if (existingBlock) {
			await prisma.block.delete({
				where: {
					id: existingBlock.id,
				},
			});
		} else {
			await prisma.block.create({
				data: {
					blockerId: currentUserId,
					blockedId: userId,
				},
			});
		}
	} catch (error) {
		console.log(
			`Error from action.ts -> switchBlock : ${JSON.stringify(error)}`
		);
		throw new Error(
			"Something went wrong from switchBlock -> action.ts file  !"
		);
	}
};

export const acceptFollowRequest = async (userId: string) => {
	const { userId: currentUserId } = await auth();

	if (!currentUserId) {
		throw new Error("User is not authenticated !");
	}

	try {
		const existingFollowRequest = await prisma.followRequest.findFirst({
			where: {
				senderId: userId,
				receiverId: currentUserId,
			},
		});

		if (existingFollowRequest) {
			await prisma.followRequest.delete({
				where: {
					id: existingFollowRequest.id,
				},
			});
		}

		await prisma.follower.create({
			data: {
				followerId: userId,
				followingId: currentUserId,
			},
		});
	} catch (error) {
		console.log(
			`Error from action.ts -> acceptFollowRequest : ${JSON.stringify(error)}`
		);
		throw new Error(
			"Something went wrong from switchBlock -> action.ts file  !"
		);
	}
};

export const declineFollowRequest = async (userId: string) => {
	const { userId: currentUserId } = await auth();

	if (!currentUserId) {
		throw new Error("User is not authenticated !");
	}

	try {
		const existingFollowRequest = await prisma.followRequest.findFirst({
			where: {
				senderId: userId,
				receiverId: currentUserId,
			},
		});

		if (existingFollowRequest) {
			await prisma.followRequest.delete({
				where: {
					id: existingFollowRequest.id,
				},
			});
		}
	} catch (error) {
		console.log(
			`Error from action.ts -> acceptFollowRequest : ${JSON.stringify(error)}`
		);
		throw new Error(
			"Something went wrong from switchBlock -> action.ts file  !"
		);
	}
};

export const updateProfile = async (
	prevState: { success: boolean; error: boolean },
	payload: { formData: FormData; cover: string }
) => {
	const { formData, cover } = payload;

	const fields = Object.fromEntries(formData);

	// console.log(`updateProfile -> action.ts file -> fields
	// 	 : ${JSON.stringify(fields)}`);

	/** As we set default field value in form field so don't need to check empty string here, otherwise need it */
	// const filteredFields = Object.fromEntries(
	// 	Object.entries(fields).filter(([_, value]) => value !== "")
	// );

	// console.log(`updateProfile -> action.ts file -> filteredFields
	// 	: ${JSON.stringify(filteredFields)}`);

	const Profile = z.object({
		cover: z.string().optional(),
		name: z.string().max(60).optional(),
		surname: z.string().max(60).optional(),
		description: z.string().max(255).optional(),
		city: z.string().max(60).optional(),
		school: z.string().max(100).optional(),
		work: z.string().max(100).optional(),
		website: z.string().max(100).optional(),
	});

	const validatorFields = Profile.safeParse({ ...fields, cover });

	///console.log(`...validatorFields.data -> ${JSON.stringify({...validatorFields.data})}`);

	if (!validatorFields.success) {
		console.log(validatorFields.error.flatten().fieldErrors);

		return { success: false, error: true };
	}

	const { userId } = await auth();

	if (!userId) {
		console.log("User is not authenticated !");

		return { success: false, error: true };
	}

	try {
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: { ...validatorFields.data },
		});

		return { success: true, error: false };
	} catch (error) {
		console.log(
			`Error from action.ts -> updateProfile : ${JSON.stringify(error)}`
		);

		return { success: false, error: true };
	}
};

export const switchLike = async (postId: number) => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User is not authenticated !");
	}

	try {
		const existingLike = await prisma.like.findFirst({
			where: {
				postId,
				userId,
			},
		});

		if (existingLike) {
			await prisma.like.delete({
				where: {
					id: existingLike.id,
				},
			});
		} else {
			await prisma.like.create({
				data: {
					postId,
					userId,
				},
			});
		}
	} catch (error) {
		console.log(
			`Error from action.ts -> switchLike : ${JSON.stringify(error)}`
		);
		throw new Error("Something went wrong from switchLike -> action.ts file !");
	}
};

export const addComment = async (postId: number, desc: string) => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User is not authenticated !");
	}

	try {
		const createdComment = await prisma.comment.create({
			data: {
				desc,
				userId,
				postId,
			},
			include: {
				user: true,
			},
		});

		return createdComment;

	} catch (error) {
		console.log(
			`Error from action.ts -> addComment : ${JSON.stringify(error)}`
		);
		throw new Error("Something went wrong from addComment -> action.ts file !");
	}
};


export const addPost = async (formData:FormData, img:string) =>{
	
	const {userId} = await auth();
	if (!userId) {
		throw new Error("User is not authenticated !");
	}

	const desc = formData.get("desc") as string;

	const Desc = z.string().min(1).max(255)

	const validateDesc = Desc.safeParse(desc)
 
	if(!validateDesc.success){
		console.log(`Invalid Post text!`);
		throw new Error(`INVALID POST TEXT !`)
	}

	try {
		await prisma.post.create({
			data:{
				desc: validateDesc.data,
				userId,
				img
			}
		})
		
		revalidatePath("/");
	} catch (error) {
		console.log(
			`Error from action.ts -> addPost : ${JSON.stringify(error)}`
		);
		throw new Error("Something went wrong from addPost -> action.ts file !");		
	}
}
