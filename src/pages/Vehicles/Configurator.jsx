import React, { useEffect } from "react";
import { useParams } from "react-router";
import { validModels, getModelDetails } from "../../constants/helpers";
import { pricingData } from "../../constants";
import { TopBar, Navbar, Pricing, Customization, ConfigSummary } from "../../components";
import { setInterior, setModel } from "../../features/configurator/pricingSlice";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { setImg } from "../../features/configurator/imgSlice";

const Configurator = () => {
  const { modelName } = useParams();
  const dispatch = useDispatch();

  // Get model details
  const { name, year, price, img } = getModelDetails(modelName);

  // Get states from Redux
  const imgUrl = useSelector((state) => state.img.img);
  const interior = useSelector((state) => state.pricing.interior);

  // Validate model and set title
  useEffect(() => {
    if (!validModels.some(({ name }) => name === modelName)) {
      return;
    }
    dispatch(setModel(modelName));
    document.title = `Design Your ${name} | Tesla`;
  }, [modelName, name, dispatch]);

  // Validate model name
  if (!validModels.some(({ name }) => name === modelName)) {
    return <h1>Invalid Model Name</h1>;
  }

  // Handle carousel actions
  const handleCarousel = (direction) => {
    if (direction === "left") {
      dispatch(setImg(img)); // Replace with actual logic for left navigation
    } else if (direction === "right") {
      dispatch(setInterior(interior)); // Replace with actual logic for right navigation
    } else {
      console.error("Invalid direction");
    }
  };

  return (
    <div className="size-full min-h-dvh flex flex-col relative overflow-x-hidden">
      <TopBar>
        <div className="text-center">
          Take delivery by December 31 to receive 3 months of FSD (Supervised) and Supercharging.
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
        {/* Fixed Carousel Navigation */}
        <div className="fixed inset-0 flex justify-between px-4 z-30 items-center md:w-[70%]">
          <button
            className="bg-dimmed-3 size-7 rounded-[4px] flex items-center justify-center cursor-pointer"
            onClick={() => handleCarousel("left")}
          >
            <ChevronLeftIcon className="size-4 text-black" />
          </button>
          <button
            className="bg-dimmed-3 size-7 rounded-[4px] flex items-center justify-center cursor-pointer"
            onClick={() => handleCarousel("right")}
          >
            <ChevronLeftIcon className="size-4 text-black transform rotate-180" />
          </button>
        </div>

        {/* Carousel */}
        <div className="carousel w-full md:w-[70%] flex justify-center h-[40vh] bg-white md:shadow-none">
          <img
            src={imgUrl || img}
            alt={`Image of ${name}`}
            className={`transition-all ease-linear duration-300 bg-cover bg-center max-w-full scale-1 md:scale-[1.3] lg:scale-[1.9] md:h-96 ${imgUrl?.includes("interior") ? "!scale-x-[1.4] !scale-y-[1.7]" : ""
              }`}
          />
        </div>

        {/* Sidebar */}
        <aside className="bg-white w-full md:w-[30%] flex flex-col items-center gap-5 relative mt-[30vh] md:mt-0">
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
