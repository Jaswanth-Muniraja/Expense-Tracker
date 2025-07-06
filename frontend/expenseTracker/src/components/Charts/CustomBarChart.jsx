// CustomBarChart.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border text-xs">
        <p className="font-semibold text-purple-800 mb-1">{payload[0].payload.month || payload[0].payload.category}</p>
        <p className="text-sm text-gray-600">
          Amount: <span className="text-sm font-medium text-gray-800">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? '#875cf5' : '#cfbefb';
  };

  if (!data || data.length === 0) {
    return <div className="bg-white mt-6 h-full flex items-center justify-center">No data available</div>;
  }

  return (
    <div className="bg-white mt-6 h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey={data[0].month ? "month" : "category"} 
            tick={{ fontSize: 12, fill: '#555' }} 
          />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: 'yellow' }}
            activeBar={{ fill: 'green' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;