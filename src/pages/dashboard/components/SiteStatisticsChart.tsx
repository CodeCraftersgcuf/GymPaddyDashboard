import React, { useState } from 'react';
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
import { useGetUserStatistics } from '../../../utils/queries/dashboardQueries';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PERIODS = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: '1 Year', value: '1y' },
];

const DATASET_COLORS = ['#FF0000', '#0000FF', '#008000', '#800080'];

const SiteStatisticsChart: React.FC = () => {
  const [period, setPeriod] = useState('30d');
  const { data, isLoading } = useGetUserStatistics(period);

  const chartData = {
    labels: data?.labels ?? [],
    datasets: (data?.datasets ?? []).map((ds, i) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: DATASET_COLORS[i % DATASET_COLORS.length],
      borderRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 12,
          maxRotation: 0,
        },
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
    },
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex justify-end gap-1 flex-shrink-0">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              period === p.value
                ? 'bg-red-500 text-white border-red-500'
                : 'text-gray-500 border-gray-300 hover:border-red-400 hover:text-red-500'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading chart…
          </div>
        ) : (
          <Bar options={options} data={chartData} />
        )}
      </div>
    </div>
  );
};

export default SiteStatisticsChart;
