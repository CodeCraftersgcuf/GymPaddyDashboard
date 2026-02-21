import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData } from '../../../utils/queries/analyticsQueries';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const COLORS = ['#FF0000', '#0000FF', '#008000', '#800080', '#FF8C00', '#00CED1'];

interface Props {
  chartData?: ChartData;
  title?: string;
}

const AnalyticsChart: React.FC<Props> = ({ chartData, title }) => {
  if (!chartData || !chartData.labels?.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No chart data available
      </div>
    );
  }

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((ds, i) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: COLORS[i % COLORS.length],
      borderRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 12, maxRotation: 0 },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { precision: 0 },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: { usePointStyle: true, boxWidth: 10, padding: 10 },
      },
      ...(title ? { title: { display: true, text: title } } : {}),
    },
  };

  return <Bar options={options} data={data} />;
};

export default AnalyticsChart;
