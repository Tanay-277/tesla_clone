import React from 'react';
import { generateCustomizationCatalog, getCustomizationButtons, decodeOption } from '../../constants/helpers';
import { setInterior, setExterior, setRims } from '../../features/configurator/pricingSlice';
import { useDispatch, useSelector } from 'react-redux';

const Customization = ({ modelName }) => {
    const model = modelName;
    const catalog = generateCustomizationCatalog(model);

    const availableOptions = {
        exterior: getCustomizationButtons(model, "exterior", catalog),
        rims: getCustomizationButtons(model, "rims", catalog),
        interior: getCustomizationButtons(model, "interior", catalog),
    };

    // console.log("Available Options", availableOptions);

    const { interior, exterior, rims } = useSelector((state) => state.pricing);
    console.log("Interior", interior);
    // console.log("Exterior", exterior);
    // console.log("Rims", rims);


    return (
        <div className="flex flex-col items-center justify-center px-6 gap-10">
            <CustomizationBox option="exterior" availableOptions={availableOptions} optionState={exterior} setOptionState={setExterior} />
            <CustomizationBox option="rims" availableOptions={availableOptions} optionState={rims} setOptionState={setRims} />
            <CustomizationBox option="interior" availableOptions={availableOptions} optionState={interior} setOptionState={setInterior} />
            <div className="row w-full justify-center">
                <button className=" -mt-4 rounded-md text-sm px-5 py-2 bg-black/10 text-gray-700 transition-colors ease-linear hover:bg-black/15">Feature Details</button>
            </div>
        </div>
    );
};

export default Customization;


const CustomizationBox = ({ option, availableOptions, optionState, setOptionState }) => {
    const hasDesc = optionState.hasOwnProperty("desc");
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Exterior Customizations */}
            <p className="text-dimmed-1">
                {optionState.price > 0 ? `$${optionState.price.toLocaleString()}` : "Included"}
            </p>
            <p className="text-lg font-medium">{decodeOption(optionState.name)}</p>
            <div className="row items-center justify-center gap-2 mt-3">
                {availableOptions[option].map((option, index) => (
                    <button
                        key={index}
                        className={`option-button p-1.5 rounded-full border-[0.1px] border-transparent
                             ${option.name === optionState.name ? "!border-black/30 bg-black/10" : ""
                            }`}
                        onClick={() => dispatch(setOptionState(option))}
                        title={decodeOption(option.name)}
                    >
                        <img
                            src={option?.img}
                            alt={option?.name}
                            className={!hasDesc ? "size-9" : "size-10"}
                        />
                    </button>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center mt-5 text-sm">

                {hasDesc && (
                    <p
                        className={`${option === "interior" ? "text-black font-medium" : "text-dimmed-1"}`}
                    >
                        {optionState.desc}
                    </p>
                )}
                {option === "rims" && (
                    <p className="text-dimmed-1">
                        Range ({optionState.rangeMetric}) : {optionState.range}
                    </p>
                )}
            </div>

        </div>
    )
}