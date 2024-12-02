import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'

const ConfigSummary = () => {
    const { finalPrice } = useSelector((state) => state.pricing)
    const { paymentType } = useSelector((state) => state.pricing.trim)

    return (
        <div className='flex flex-row w-full items-center justify-between px-6 py-3 fixed md:sticky bottom-0 bg-white shadow-dimmed rounded-t-lg md:mr-3'>
            <div className="left">
                <p className='row text-2xl font-display gap-1'>
                    ${finalPrice.toLocaleString()}
                    {
                        paymentType !== 'Cash' && (
                            <span> /mo</span>
                        )
                    }
                    <ChevronDownIcon className='mt-0.5 h-6 w-6' />
                </p>
                <p className='text-xs text-dimmed-1'>after est. savings</p>
            </div>
            <div className="right">
                <button className='bg-blue-600 text-white px-7 text-sm rounded-md py-2.5 font-medium'>Order Now</button>
            </div>
        </div>
    )
}

export default ConfigSummary