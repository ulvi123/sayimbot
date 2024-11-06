import React, { useState } from 'react';

const DataManagement = () => {
  const [date, setDate] = useState('');

  const handleGenerate = () => {
    // Logic to generate data based on the selected date
    console.log(`Generating data for: ${date}`);
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
          {/* Sample data rows */}
          <tr>
            <td className="border px-4 py-2">2023-10-01 / 08:09:78</td>
            <td className="border px-4 py-2">2023-10-01 / 09:09:78</td>
            <td className="border px-4 py-2">Bread</td>
            <td className="border px-4 py-2">12,345</td>
            <td className="border px-4 py-2">xlsx</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Export Data
              </button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">2023-10-01 / 08:09:78</td>
            <td className="border px-4 py-2">2023-10-01 / 09:09:78</td>
            <td className="border px-4 py-2">Bread</td>
            <td className="border px-4 py-2">13,567</td>
            <td className="border px-4 py-2">xlsx</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Export Data
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataManagement;