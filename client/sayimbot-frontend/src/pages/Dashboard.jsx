import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaEye, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { id: 1, icon: <FaUsers />, label: 'Total Users', value: '1,200' },
    { id: 2, icon: <FaEye />, label: 'Total Views', value: '45,000' },
    { id: 3, icon: <FaClipboardList />, label: 'Reports Generated', value: '320' },
  ];

  const recentActivities = [
    'User JaneDoe viewed Report #567',
    'System backup completed successfully.',
    'New data sync with the database was successful.',
    'User MikeDoe accessed Camera Feed 2.',
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Sayarbot Dashboard, your central overview of system performance and user activities.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="bg-white p-6 rounded-lg shadow-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl text-blue-500 mr-4">{stat.icon}</div>
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="bg-white p-6 rounded-lg shadow-md">
          {recentActivities.map((activity, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {activity}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Insights</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Here you can display summaries, trends, or key insights derived from your data.
          </p>
          <p className="text-gray-700">
            For instance, trends in camera usage, analytics summaries, or system performance metrics can be shown here as the data becomes available.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
