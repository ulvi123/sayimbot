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

  const handleExport = async () => {
    if(!date || date.trim() === '') {
      alert('Please enter a valid date.');
      return;
    }
    try {
      console.log('Attempting to export data for date:', date);
      const response = await axios.get(`${API_BASE_URL}/data-management/download`, {
        params: { date: date },
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include if you're using authentication
        }
      });

      console.log('Response received:', response);

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `bread_production_data_${date}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        if (error.response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            console.error('Response data:', reader.result);
          };
          reader.readAsText(error.response.data);
        } else {
          console.error('Response data:', error.response.data);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      alert('Failed to export data. Please check the console for more details and try again.');
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
        <button
              onClick={handleExport}
              disabled={!date || data.length === 0}
              className={`
                text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow-md w-full sm:w-auto
                  ${(date && data.length > 0)
                  ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'}
              `}
        >
          Export Data
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataManagement;