// IncomeOverview.js
import { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import { LuPlus } from "react-icons/lu";

const IncomeOverview = ({ transactions, onAddIncome, label, content }) => {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);
    
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'> {label} Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>{content}.</p>
                </div>
                <button className='add-btn' onClick={onAddIncome}>
                    <LuPlus className='text-lg' /> Add {label}
                </button>
            </div>
            
            <div className='mt-6 h-80'>  
                <CustomBarChart data={chartData}/>
            </div>
        </div>
    );
}

export default IncomeOverview;