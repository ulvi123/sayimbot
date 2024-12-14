import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaEye, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { id: 1, icon: <FaUsers />, label: 'Ümumi istifadəçilər', value: '3' },
    { id: 2, icon: <FaEye />, label: 'Ümumi baxışlar', value: '200' },
    { id: 3, icon: <FaClipboardList />, label: 'Yaradılmış hesabatlar', value: '20' },
  ];

  const recentActivities = [
    'İstifadəçi Cavidan Baloglanov Hesabat №2-yə baxdı',
    'Sistemin ehtiyat köçürməsi uğurla başa çatdı.',
    'Məlumat bazası ilə yeni sinxronlaşdırma həyata keçirildi.',
    'İstifadəçi Cavidan Baloglanov Kamera Görüntüsü 1-ə daxil oldu.',
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Idarə paneli
        </h1>
        <p className="text-gray-600">
          Sistem performansı və istifadəçi fəaliyyətləri haqqında mərkəzi icmalınız olan Sayarbot İdarə Panelinə xoş gəlmisiniz.</p>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Son Fəaliyyətlər
        </h2>
        <ul className="bg-white p-6 rounded-lg shadow-md">
          {recentActivities.map((activity, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {activity}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Məlumatlar</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Burada məlumatlarınızdan alınan xülasələri, meylləri və ya əsas anlayışları göstərə bilərsiniz.          </p>
          <p className="text-gray-700">
            Məsələn, kamera istifadəsi, analitik xülasələr və ya sistem performans göstəriciləri ilə bağlı tendensiyalar burada göstərilir.          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
