import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';



const LinearChart = ({ data }) => {
  // Extracting data from the provided object
  const { labels, datasets } = data;

  ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

  // Mapping datasets to Chart.js required format
  const chartData = datasets.map((dataset) => {
    const fieldName = Object.keys(dataset)[0]; // Assuming each dataset has only one field
    return {
      label: fieldName,
      data: dataset[fieldName],
      fill: false,
      borderColor: getRandomColor(),
    };
  });

  // Generating random color for each dataset
  function getRandomColor() {
    const colors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
    }
    const colorNames = Object.keys(colors);
    const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];
    return colors[randomColorName];
  }

  // Creating chart options
  const chartOptions = {
    scales: {
      yAxes: [
        {
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
        },
        {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right',
        },
      ],
    },
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Line data={{ labels, datasets: chartData }} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default LinearChart;
