import { filterOutliers, roundPrice } from '@/constants'
import React from 'react'

const Price = ({item , prices}) => {
  return (
    <div>
        <div className="border">
        <h5 className="text-[36px] text-primary-500 ">₦{roundPrice(filterOutliers(prices))}</h5>
        <h6 className=" text-left">{filterOutliers(prices)}</h6>

        </div>
        
    </div>
  )
}

export default Price