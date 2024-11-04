import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
	return (
		<div className="flex flex-col gap-4">
			{/* USER  */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Image
						src="/img/MainAfter.jpg"
						width={40}
						height={40}
						alt=""
						className="w-10 h-10 rounded-full"
					/>
					<span className="font-medium">Hosne Zahan</span>
				</div>
				<Image src="/more.png" width={16} height={16} alt="" />
			</div>
			{/* DESC  */}
			<div className="flex flex-col gap-4">
				<div className="w-full min-h-96 relative">
					<Image
						src="/img/colorfull_bird.jpg"
						alt=""
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover rounded-md"
					/>
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, placeat
					quam ipsam repellat accusamus officiis illum obcaecati nihil facere
					consectetur et odit cumque necessitatibus officia? Quo impedit
					deleniti cupiditate eveniet modi id consectetur non, quibusdam
					voluptas nemo aliquam corrupti distinctio consequuntur. Aut earum
					adipisci, architecto tenetur, voluptate est, maxime saepe cum eum
					debitis incidunt consequatur neque nemo odio eveniet quibusdam
					molestiae. Saepe eos blanditiis praesentium molestias explicabo
					provident unde? Atque veniam optio ratione, eveniet nesciunt eum
					doloremque quo reiciendis beatae similique consequatur nemo temporibus
					error minima dolorum at? Possimus voluptatibus, temporibus a dolore
					alias eos mollitia expedita tempora architecto minima. Dolorem
					repellat officia ad sed animi harum saepe magni aspernatur, at id hic,
					eius eveniet doloremque a obcaecati adipisci veniam, explicabo amet
					quae dolorum aliquam quo praesentium earum! Harum fuga nam placeat!
					Laudantium voluptatum debitis numquam minima, dolorem libero laborum
					maiores ullam eaque. Accusamus amet, animi vitae sequi laudantium ea
					illum obcaecati ex doloremque quos aliquid adipisci expedita corporis
					quibusdam est dolor, minus incidunt, non odio dolorum beatae eum.
					Commodi praesentium illum magnam vero modi quod, sint ipsa obcaecati,
					voluptatem laudantium non nostrum voluptatum ea impedit eos quasi
					aliquid molestias totam delectus ullam nemo pariatur distinctio
					aspernatur! Assumenda, dolorem asperiores.
				</p>
			</div>
			{/* INTERACTION  */}
			<div className="flex items-center justify-between text-sm my-3">
				<div className="flex gap-8">
					<div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
						<Image
							src="/like.png"
							width={16}
							height={16}
							alt=""
							className="cursor-pointer"
						/>
						<span className="text-gray-300">|</span>
						<span className="text-gray-500">
							167 <span className="hidden md:inline"> Likes</span>
						</span>
					</div>
					<div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
						<Image
							src="/comment.png"
							width={16}
							height={16}
							alt=""
							className="cursor-pointer"
						/>
						<span className="text-gray-300">|</span>
						<span className="text-gray-500">
							167 <span className="hidden md:inline"> Comments</span>
						</span>
					</div>
				</div>
				<div className="">
					<div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
						<Image
							src="/share.png"
							width={16}
							height={16}
							alt=""
							className="cursor-pointer"
						/>
						<span className="text-gray-300">|</span>
						<span className="text-gray-500">
							167 <span className="hidden md:inline"> Shares</span>
						</span>
					</div>
				</div>
			</div>
			<Comments />
		</div>
	);
};

export default Post;
