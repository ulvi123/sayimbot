import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Adjust if your NestJS server is on a different port

const DataManagement = () => {
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (date) {
      fetchData();
    }
  }, [date]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/data-management?date=${date}`);
      console.log('API response:', response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  const handleGenerate = async () => {
    try {
      await axios.post(`${API_BASE_URL}/data-management/generate`, { date });
      console.log(`Generating data for: ${date}`);
      fetchData(); // Fetch updated data after generation
    } catch (error) {
      console.error('Error generating data:', error);
    }
  };

  const handleExport = async (entry) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/data-management/download?date=${date}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `data_${date}.xlsx`;
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Reporting</h1>
      <div className="flex items-center mb-6">
        <label className="mr-2">Manage Your Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded py-2 px-3 mr-2"
        />
        <button
          onClick={handleGenerate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Data Overview</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Start time</th>
            <th className="border px-4 py-2">End time</th>
            <th className="border px-4 py-2">Material</th>
            <th className="border px-4 py-2">Count</th>
            <th className="border px-4 py-2">Format</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{new Date(entry.startTime).toLocaleString()}</td>
              <td className="border px-4 py-2">{new Date(entry.endTime).toLocaleString()}</td>
              <td className="border px-4 py-2">{entry.material}</td>
              <td className="border px-4 py-2">{entry.count.toLocaleString()}</td>
              <td className="border px-4 py-2">{entry.format}</td>
              <td className="border px-4 py-2">
                <button 
                  onClick={() => handleExport(entry)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Export Data
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataManagement;