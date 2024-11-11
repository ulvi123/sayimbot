import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
  // Updated data for bread production analytics
  const pieData = {
    labels: ['Morning Shift', 'Afternoon Shift', 'Night Shift'],
    datasets: [
      {
        label: 'Production by Shift',
        data: [500000, 450000, 300000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Bread Production',
        data: [120000, 134500, 150000, 145000],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Bread Count',
        data: [20000, 22000, 25000, 23000, 24000, 26000, 27000],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Good Quality', 'Defective'],
    datasets: [
      {
        label: 'Quality Distribution',
        data: [850000, 15000],
        backgroundColor: ['#4BC0C0', '#FF6384'],
      },
    ],
  };

  // Daily bread count bar chart data
  const dailyCountData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Daily Bread Production',
        data: [20000, 21000, 21500, 20500, 22000, 22500, 23000],
        backgroundColor: '#FFA726',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bread Production Analytics Dashboard</h1>
        <p className="text-gray-600">Explore detailed analytics related to bread production and quality control.</p>
      </header>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Production by Shift</h2>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart - Weekly Production */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Bread Production</h2>
          <Bar data={barData} />
        </div>

        {/* Line Chart - Daily Bread Count */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Bread Count Trend</h2>
          <Line data={lineData} />
        </div>

        {/* Doughnut Chart - Quality Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quality Distribution</h2>
          <Doughnut data={doughnutData} />
        </div>

        {/* Bar Chart - Daily Bread Production */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Bread Production</h2>
          <Bar data={dailyCountData} />
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
