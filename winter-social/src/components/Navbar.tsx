import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
	return (
		<div className="h-24 flex items-center justify-between">
			{/* LEFT */}
			<div className="">
				<Link href="/" className="font-bold text-xl text-blue-800">
					WINTER
				</Link>
			</div>
			{/* CENTER */}
			<div className="hidden">
				{/* LINKS */}
				<div className=""></div>
			</div>
			{/* RIGHT */}
			<div className=""></div>
			<div className="">
				<MobileMenu />
			</div>
		</div>
	);
};

export default Navbar;
