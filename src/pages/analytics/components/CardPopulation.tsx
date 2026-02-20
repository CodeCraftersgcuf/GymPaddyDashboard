import React from 'react'
import AnalyticsCard from './AnalyticsCard';
interface displayData {
    label:string;
    value:string;
}
interface props {
    data: displayData[]
}
const CardPopulation: React.FC<props> = ({data}) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
        {
            data.map((item,index)=>(
                <AnalyticsCard key={index} {...item} />
            ))
        }
    </div>
  )
}

export default CardPopulation