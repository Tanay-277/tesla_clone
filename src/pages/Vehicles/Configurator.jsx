import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { validModels, getModelDetails } from "../../constants/helpers";
import { pricingData } from "../../constants";
import { TopBar, Navbar, Pricing, Customization, ConfigSummary } from "../../components";
import { setModel } from "../../features/configurator/pricingSlice";
import { useDispatch } from "react-redux";

const Configurator = () => {
	const { modelName } = useParams();
	const dispatch = useDispatch();

	const { name, year, price, img } = getModelDetails(modelName);

	useEffect(() => {
		dispatch(setModel(modelName));
	}, [modelName, dispatch]);

	document.title = `Design Your ${name} | Tesla`;
	if (!validModels.some(({ name }) => name === modelName)) {
		return <h1>Invalid Model Name</h1>;
	}


	return (
		<div className="size-full min-h-dvh flex flex-col relative overflow-x-hidden">
			<TopBar>
				<div className="text-center">
					Take delivery by December 31 to receive 3 months of FSD (Supervised)
					and Supercharging.
					<a href="#" className="underline underline-offset-2 ml-1">
						Learn More
					</a>
				</div>
				<div className="text-center">
					0% APR available for qualified buyers.
					<a href="#" className="underline underline-offset-2 ml-1">
						Learn More
					</a>
				</div>
			</TopBar>
			<Navbar mode="simple" />
			<main className="w-full flex flex-col md:flex-row justify-between md:py-6 h-dvh md:h-[calc(100dvh-108px)]">
				<div className="carousel w-full md:w-[70%] flex justify-center fixed top-0 z-10 h-[40vh] bg-white md:fixed md:top-auto md:-z-10 shadow-[0_5px_10px_0px_#ffffff] md:shadow-none">
					<img
						src={img}
						alt={`Image of ${name}`}
						className="bg-cover bg-center max-w-full scale-1 md:scale-[1.3] lg:scale-[1.9] md:h-96"
					/>
				</div>
				<div className="space hidden md:w-[70%] h-full md:flex"></div>
				<aside className="w-full md:w-[30%] flex flex-col items-center gap-5 relative mt-[30vh] md:mt-0">
					<h1 className="text-5xl font-medium font-display">{name}</h1>
					<div className="row text-gray-800 items-center justify-center gap-10">
						<div className="flex flex-col items-center justify-center">
							<p className="text-xl font-display font-medium">
								337 <span className="text-sm">mi</span>
							</p>
							<p className="text-sm font-normal">Range (EPA est.)</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p className="text-xl font-display font-medium">
								135 <span className="text-sm">mph</span>
							</p>
							<p className="text-sm font-normal">Top Speed</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p className="text-xl font-display font-medium">
								6.5 <span className="text-sm">sec</span>
							</p>
							<p className="text-sm font-normal">0-60 mph</p>
						</div>
					</div>
					<Pricing pricingData={pricingData} />
					<Customization modelName={modelName} />
					<ConfigSummary />
				</aside>
			</main>
		</div>
	);
};

export default Configurator;