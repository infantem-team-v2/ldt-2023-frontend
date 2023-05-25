import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



const PieChart = ({ data }) => {

  ChartJS.register(ArcElement, Tooltip, Legend);
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // Add more colors as needed
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div className=''>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
