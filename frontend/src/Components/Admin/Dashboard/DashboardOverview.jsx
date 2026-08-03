import { Icon } from '@mui/material';
import React from 'react'
import { formatRevenue } from '../../../utils/FormatPrice';

const DashboardOverview = ({title,amount,icon,revenue=false}) => {

    const convertedAmount=revenue? Number(amount).toFixed(2) : amount;

  return (
    <div>
        <div>
            <h3>{title}</h3>
            <Icon/>
        </div>
        <h1>
            {revenue ? "$" : null}
            {revenue ? formatRevenue(convertedAmount) : convertedAmount}
        </h1>
    </div>
  )
}

export default DashboardOverview