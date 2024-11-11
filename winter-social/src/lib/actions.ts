"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";

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

export const updateProfile = async (formData: FormData) => {
	const fields = Object.fromEntries(formData);

	console.log(`updateProfile -> action.ts file -> fields
		 : ${JSON.stringify(fields)}`);

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

	const validatorFields = Profile.safeParse(fields);

	///console.log(`...validatorFields.data -> ${JSON.stringify({...validatorFields.data})}`);

	if (!validatorFields.success) {
		console.log(validatorFields.error.flatten().fieldErrors);
		return null;
	}

	const { userId } = await auth();

	if (!userId) {
		throw new Error("User is not authenticated !");
	}

	try {
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: { ...validatorFields.data },
		});
	} catch (error) {
		console.log(
			`Error from action.ts -> updateProfile : ${JSON.stringify(error)}`
		);
		throw new Error(
			"Something went wrong from updateProfile -> action.ts file  !"
		);
	}
};
