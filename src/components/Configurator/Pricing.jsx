import React from "react";
import Checkbox from "../Utils/Checkbox";
import { paymentMethods, calculatePriceWithIncentives } from "../../constants/helpers";
import { useSelector, useDispatch } from "react-redux";
import { setIncentives, setPaymentType, setTrim } from "../../features/configurator/pricingSlice";

const Pricing = ({ pricingData }) => {

    const { paymentType, selectedTrim, incentivesChecked } = useSelector((state) => state.pricing.trim);
    const dispatch = useDispatch();


    const formatPrice = (price, suffix = "") => `$${price?.toLocaleString()}${suffix}`;

    const renderPaymentDetails = (pricing) => {
        if (paymentType === "Cash") return null;

        const { downPayment, apr, duration, term, mileageLimit } = pricing;
        return (
            <p className="text-sm text-gray-500">
                {paymentType === "Lease"
                    ? `${formatPrice(downPayment, " down")}, ${term}, ${mileageLimit}`
                    : `${formatPrice(downPayment, " down")}, ${apr}% APR, ${duration} months`}
            </p>
        );
    };

    const renderTrimButton = (trim) => {
        const pricing = trim.pricing[paymentType.toLowerCase()];
        const price = calculatePriceWithIncentives(paymentType, pricing.price, pricing.incentives, incentivesChecked);
        const isSelected = selectedTrim.name === trim.name;

        return (
            <button
                key={trim.name}
                onClick={() => dispatch(setTrim(trim))}
                className={`my-3 w-full border px-4 py-3 text-sm rounded-[4px] flex justify-between items-center ${isSelected ? "border-black bg-gray-100" : "border-gray-300"}`}
            >
                <span className={isSelected ? "font-medium text-black" : ""}>{trim.name}</span>
                <span className={isSelected ? "font-medium text-black" : ""}>
                    {formatPrice(price, paymentType === "Cash" ? "" : "/mo")}
                </span>
            </button>
        );
    };

    const currentPricing = selectedTrim.pricing;
    // console.log(currentPricing);

    const finalPaymentReport = {
        paymentType,
        selectedTrim: selectedTrim?.name,
        incentivesChecked,
        paymentDetails: currentPricing,
    }

    // console.table(finalPaymentReport);

    return (
        <div className="row items-center justify-center px-6">
            {/* Payment Methods */}
            <div className="row text-black/60 py-2 text-sm mx-auto !flex-nowrap justify-center items-center">
                {paymentMethods.map((method) => (
                    <button
                        key={method}
                        className={`px-9 py-2 font-medium transition-all duration-200 ease-in-out border-b-2 ${paymentType === method
                            ? "border-black text-black"
                            : "border-gray-300 text-gray-500"
                            }`}
                        onClick={() => dispatch(setPaymentType(method))}
                    >
                        {method}
                    </button>
                ))}
            </div>

            {/* Trim Selection */}
            <div className="w-full text-gray-500">
                {pricingData.models[0].trims.map(renderTrimButton)}
            </div>

            {/* Selected Trim Pricing Details */}
            <div className="flex flex-col items-center text-center mt-3">
                {renderPaymentDetails(currentPricing)}
            </div>

            {/* Incentives Checkbox */}
            <div className="mt-4 flex items-start justify-center">
                <Checkbox
                    checked={incentivesChecked}
                    onChange={() => dispatch(setIncentives())}
                />
                <label
                    className="text-sm text-gray-500 ml-2 cursor-pointer"
                    onClick={() => dispatch(setIncentives())}
                >
                    Include est.{" "}
                    {currentPricing?.incentives?.federal > 0 &&
                        `incentives of ${formatPrice(currentPricing.incentives.federal)} and `}
                    gas savings of {currentPricing?.incentives?.gasSavings}
                    {paymentType !== "Cash" && "/mo"}
                </label>
            </div>
            <div className="row w-full justify-center">
                <button className="mt-4 text-sm border-b-[1px] border-gray-600 text-gray-500 transition-colors ease-linear hover:text-black">Edit Terms & Savings</button>
            </div>
            <div className="row w-full justify-center">
                <button className="mt-4 rounded-md text-sm px-5 py-2 bg-black/10 text-gray-700 transition-colors ease-linear hover:bg-black/15">Feature Details</button>
            </div>
        </div>
    );
};

export default Pricing;
