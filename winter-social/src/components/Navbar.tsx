import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
	ClerkLoaded,
	ClerkLoading,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
	return (
		<div className="h-24 flex items-center justify-between">
			{/* LEFT */}
			<div className="lg-block w-[20%]">
				<Link href="/" className="font-bold text-xl text-blue-800">
					WINTER
				</Link>
			</div>
			{/* CENTER */}
			<div className="hidden md:flex w-[50%] text-sm items-center justify-between">
				{/* LINKS */}
				<div className="flex gap-6 text-gray-600">
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/home.png"
							alt="homepage"
							width={16}
							height={16}
							className="w-4 h-4"
						/>
						<span>Home</span>
					</Link>
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/friends.png"
							alt="friends"
							width={16}
							height={16}
							className="w-4 h-4"
						/>
						<span>Friends</span>
					</Link>
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/stories.png"
							alt="stories"
							width={16}
							height={16}
							className="w-4 h-4"
						/>
						<span>Stories</span>
					</Link>
				</div>
				<div className="hidden xl:flex p-1 bg-slate-100 items-center mx-2 rounded-xl">
					<input type="text" placeholder="search..." className="bg-transparent outline-none"/>
					<Image src="/search.png" alt="search" width={14} height={14}/>
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-[30%] flex item-center gao-4 xl:gap-8 justify-end">
				<ClerkLoading>
					<div className="flex justify-center items-center">
						<div className="animate-spin rounded-full h-4 w-4 border-t-4 border-gray-500"></div>
					</div>
				</ClerkLoading>
				<ClerkLoaded>
					<SignedIn>
						<div className="cursor-pointer">
							<Image src="/people.png" alt="user" width={20} height={20} />
						</div>
						<div className="cursor-pointer">
							<Image
								src="/messages.png"
								alt="messages"
								width={20}
								height={20}
							/>
						</div>
						<div className="cursor-pointer">
							<Image
								src="/notifications.png"
								alt="notifications"
								width={20}
								height={20}
							/>
						</div>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<div className="cursor-pointer gap-2 flex items-center text-gray-600 text-sm">
							<Image src="/login2.png" alt="login" width={20} height={20} />
							<Link href="/sign-in">Login/Register</Link>
						</div>
					</SignedOut>
				</ClerkLoaded>
				<MobileMenu />
			</div>
		</div>
	);
};

export default Navbar;
