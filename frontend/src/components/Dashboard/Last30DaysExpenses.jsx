import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const result = prepareExpenseBarChartData(data);
      setChartData(result || []);
    } else {
      setChartData([]); 
    }
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between mb-4"> {/* Added margin-bottom */}
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      
      <div className="h-[300px] min-h-[300px] w-full"> 
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;