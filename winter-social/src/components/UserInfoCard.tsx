import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserInfoCard = ({ userId }: { userId?: string }) => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
			{/* TOP  */}
			<div className="flex justify-between items-center font-medium">
				<span className="text-gray-500">User Informations</span>
				<Link href="/" className="text-blue-500 text-xs">
					See All
				</Link>
			</div>
			{/* BOTTOM  */}
			<div className="flex flex-col gap-4 text-gray-500">
				<div className="flex items-center gap-2">
					<span className="text-xl font-bold">Imran Khan</span>
					<span className="text-sm">@imrantyp</span>
				</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
					accusantium provident incidunt tenetur nemo! Nisi.
				</p>
				<div className="flex item-cemter gap-2">
					<Image src="/map.png" alt="map" width={16} height={16} />
					<span>
						Living in <b>Rangpur</b>
					</span>
				</div>
				<div className="flex item-cemter gap-2">
					<Image src="/school.png" alt="map" width={16} height={16} />
					<span>
						Went to <b>Rangpur public school, Rangpur</b>
					</span>
				</div>
				<div className="flex item-cemter gap-2">
					<Image src="/work.png" alt="map" width={16} height={16} />
					<span>
						Work at <b>Winter Inc.</b>
					</span>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex gap-1 items-center">
						<Image src="/link.png" alt="" width={16} height={16} />
						<Link
							href="https://www.facebook.com/profile.php?id=100015968622463"
							className="text-blue-500 font-medium"
						>
							Imran.dev
						</Link>
					</div>
					<div className="flex gap-1 items-center">
						<Image src="/date.png" alt="" width={16} height={16} />
						<span>Joined November 2014</span>
					</div>
				</div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-1">Follow</button>
        <span className="text-orange-400 self-end text-xs cursor-pointer px-2">Block User</span>
			</div>
		</div>
	);
};

export default UserInfoCard;
