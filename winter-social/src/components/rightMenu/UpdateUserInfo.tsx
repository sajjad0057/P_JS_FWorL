"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";

const UpdateUserInfo = ({ user }: { user: User }) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="">
			<span
				className="text-blue-500 text-xs cursor-pointer"
				onClick={() => setOpen(!isOpen)}
			>
				Update
			</span>
			{isOpen && (
				<div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center ">
					<form
						action={updateProfile}
						className="relative p-12 bg-white rounded-lg shadow-md  text-gray-600 flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3"
					>
						<h1 className="border rounded-md p-2">Update Profile</h1>
						<div className="mt-4 text-xs text-gray-500">
							Use the navbar profile to change the avatar or username
						</div>
						<hr />
						<div className="flex flex-col gap-3 my-1">
							<label htmlFor="" className="px-1">
								Cover Picture
							</label>
							<div className="flex items-center gap-2 cursor-pointer">
								<Image
									src={user.cover || "/noCover.png"}
									alt="cover pic"
									width={60}
									height={48}
									className="w-24 h-16 rounded-md object-cover border p-1"
								/>
								<span className="text-sm underline text-gray-600 p-2">
									Change
								</span>
							</div>
						</div>
						{/* INPUT  */}
						<div className="flex flex-wrap justify-between gap-2 xl:gap-4">
							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									First Name
								</label>
								<input
									type="text"
									className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
									placeholder={user.name || ""}
									defaultValue={user.name || ""}
									name="name"
								/>
							</div>

							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									Surname
								</label>
								<input
									type="text"
									className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
									placeholder={user.surname || ""}
									defaultValue={user.surname || ""}
									name="surname"
								/>
							</div>

							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									Description
								</label>
								<textarea
									placeholder={user.description || "ha ha ha"}
									defaultValue={user.description || ""}
									className="border rounded-md px-3 py-1"
									name="description"
								/>
							</div>

							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									City
								</label>
								<input
									type="text"
									className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
									placeholder={user.city || ""}
									defaultValue={user.city || ""}
									name="city"
								/>
							</div>

							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									School
								</label>
								<input
									type="text"
									className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
									placeholder={user.school || ""}
									defaultValue={user.school || ""}
									name="school"
								/>
							</div>

							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									Work
								</label>
								<input
									type="text"
									className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
									placeholder={user.work || ""}
									defaultValue={user.work || ""}
									name="work"
								/>
							</div>

							<div className="flex flex-col gap-4">
								<label htmlFor="" className="text-sm text-gray-500 ">
									Website
								</label>
								<input
									type="text"
									className="ring-1 ring-gray-300 p-2 rounded-md text-sm"
									placeholder={user.website || ""}
									defaultValue={user.website || ""}
									name="website"
								/>
							</div>
						</div>
						<button className="bg-blue-500 p-1 mt-2 rounded-md text-white">
							Update
						</button>
						<div
							className="absolute text-xl right-2 top-3 cursor-pointer px-2 border rounded-md"
							onClick={() => setOpen(!isOpen)}
						>
							<span>X</span>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default UpdateUserInfo;
