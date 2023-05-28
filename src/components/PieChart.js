import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  console.log("DAAAAATA", data)

  const labels = data.labels || [];
  const datasets = [
    {
      data: Object.values(data.datasets).map((dataset) => Object.values(dataset)[0]),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#5E55DF',
      ],
      borderWidth: 0.5,
    },
  ];

  return (
    <div className=''>
      <Pie data={{ labels, datasets }} />
    </div>
  );
};

export default PieChart;

