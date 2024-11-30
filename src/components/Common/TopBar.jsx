import React, { useState, useEffect } from "react";

const TopBar = ({ children }) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const [fade, setFade] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(true);
			setTimeout(() => {
				setActiveIndex((prev) => (prev + 1) % children.length);
				setFade(false);
			}, 500);
		}, 5000);
		return () => clearInterval(interval);
	}, [children.length]);

	const handleButtonClick = (index) => {
		setFade(true);
		setTimeout(() => {
			setActiveIndex(index);
			setFade(false);
		}, 500);
	};

	return (
		<div
			id="topbar"
			className="z-20 max-sm:hidden grid w-dvw max-w-[100dvw] bg-[#f4f4f4] h-[52px] grid-cols-12 place-items-center px-4 text-black text-base"
		>
			<div
				className={`col-span-11 transition-opacity duration-500 ${
					fade ? "opacity-0" : "opacity-100"
				}`}
			>
				{children[activeIndex]}
			</div>
			{children.length > 1 && (
				<div className="justify-self-end flex items-center gap-1 relative">
					{/* Button that moves from left to right */}
					<button
						className={`absolute transition-all ease-linear duration-500 p-1 z-20 bg-black rounded-full top-0 ${
							activeIndex === 1 ? "transform translate-x-[12px]" : ""
						}`}
					></button>

					{children.map((child, index) => (
						<button
							key={index}
							onClick={() => handleButtonClick(index)}
							className={`z-10 transition-colors ease-in-out duration-500 p-1 bg-gray-400 rounded-full`}
						></button>
					))}
				</div>
			)}
		</div>
	);
};

export default TopBar;
