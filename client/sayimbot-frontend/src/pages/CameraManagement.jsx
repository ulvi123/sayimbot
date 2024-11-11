import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaStop } from 'react-icons/fa';

const CameraManagement = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Inactive');
  const [resolution, setResolution] = useState('');

  const handleRecording = (start) => {
    setIsRecording(start);
    setStatus(start ? 'Active' : 'Inactive');
  };

  return (
    <div className="camera-management-container p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Camera Management</h1>
      
      <div className="control-panel bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Select and Control Cameras"
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRecording(true)}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-200"
            >
              <FaPlay className="mr-2" /> Activate Recording
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRecording(false)}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-200"
            >
              <FaStop className="mr-2" /> Deactivate Recording
            </motion.button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-semibold">Status:</span>
          <span className={`text-lg ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </span>

          <div className="flex items-center space-x-2">
            <span className="font-semibold">Resolution:</span>
            <input
              type="text"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="e.g., 1080p"
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>
      </div>

      <div className="live-feed bg-gray-200 rounded-lg p-8 flex items-center justify-center text-gray-400 text-xl">
        Live Camera Feed - Camera 1
      </div>
    </div>
  );
};

export default CameraManagement;
