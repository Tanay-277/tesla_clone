import React from "react";
import { Link, NavLink } from "react-router";
import {
	UserCircleIcon,
	GlobeAltIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
	{ name: "Vehicles", url: "/vehicles" },
	{ name: "Charging", url: "/charging" },
	{ name: "Discover", url: "/discover" },
	{ name: "Shop", url: "/shop" },
];

const Navbar = ({ mode }) => {
	mode = mode || "simple";
	return (
		<nav
			className={`z-20 flex items-center flex-row justify-between w-full h-[56px] px-12 ${mode === "simple" ? "md:sticky top-0 left-0 bg-white/50 backdrop-blur-lg" : ""
				}`}
		>
			<div className="left">
				<NavLink to="/">
					<img
						src="/images/logo.svg"
						alt="logo"
						className={`w-28 ${mode === "simple" ? "" : "invert"}`}
					/>
				</NavLink>
			</div>
			{mode === "!simple" && (
				<div className="center">
					{navLinks.map((link) => (
						<NavLink
							key={link.name}
							to={link.url}
							className="mr-6"
							activeClassName="text-red-500"
						>
							{link.name}
						</NavLink>
					))}
				</div>
			)}
			<div className="right flex flex-row gap-1">
				{mode === "!simple" && (
					<>
						<Link
							to="/help"
							className="transition-colors duration-300 ease-linear hover:bg-black/20 p-1 rounded-md"
						>
							<QuestionMarkCircleIcon className="h-6" />
						</Link>
						<Link
							to="/account"
							className="transition-colors duration-300 ease-linear hover:bg-black/20 p-1 rounded-md"
						>
							<UserCircleIcon className="h-6" />
						</Link>
					</>
				)}
				<Link
					to="/globe"
					className={`transition-colors duration-300 ease-linear hover:bg-black/20 p-1 rounded-md flex items-center gap-1 ${mode === "simple" ? "px-3 text-gray-600" : ""
						}`}
				>
					<GlobeAltIcon className="h-6" />
					{mode === "simple" && (
						<span className="text-gray-600 font-medium">US</span>
					)}
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
