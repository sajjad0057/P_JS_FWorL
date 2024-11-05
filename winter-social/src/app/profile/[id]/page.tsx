import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
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
								src="/img/nature_8.jpg"
								alt=""
								fill
								className="object-cover rounded-md"
							/>
							<Image
								src="/img/boy_3.jpg"
								alt=""
								width={128}
								height={128}
								className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto 
								-bottom-16 ring-4 ring-white object-cover"
							/>
						</div>
						<h1 className="mt-20 mb-4 text-2xl font-medium  text-gray-500">Imran Khan</h1>
						<div className="flex items-center font-medium  text-gray-500 justify-center gap-12 mb-4">
							<div className="flex flex-col items-center">
								<span className="">12</span>
								<span className="text-sm">Posts</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="">1.8k</span>
								<span className="text-sm">Followers</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="">50</span>
								<span className="text-sm">Following</span>
							</div>
						</div>
					</div>
					<Feed />
				</div>
			</div>
			<div className="hidden lg:block w-[30%]">
				<RightMenu userId="test" />
			</div>
		</div>
	);
};

export default ProfilePage;
