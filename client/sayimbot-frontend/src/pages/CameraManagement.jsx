import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaStop } from 'react-icons/fa';
import axios from 'axios';

const CameraManagement = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [status, setStatus] = useState('Inactive');
  const [resolution, setResolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  
  const API_BASE_URL = 'http://localhost:3000';


  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/camera`); // Fetch all cameras
        console.log('Fetched cameras:', response.data); // Log the fetched cameras
        setCameras(response.data);
        
        // Set the first camera by default if available
        if (response.data.length > 0) {
          const firstCamera = response.data[0];
          setSelectedCamera(firstCamera);
          setStatus(firstCamera.status);
          setResolution(firstCamera.resolution || '');
          setIsRecording(firstCamera.isRecording);
        }
      } catch (error) {
        setError(`Failed to fetch cameras: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const handleCameraSelect = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/camera/${id}`);
      console.log('Selected camera data:', response.data); // Log the selected camera data
      setSelectedCamera(response.data);
      setStatus(response.data.status);
      setResolution(response.data.resolution || '');
      setIsRecording(response.data.isRecording);
    } catch (error) {
      setError(`Failed to fetch camera data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!selectedCamera) {
      setError("No camera selected");
      return;
    }

    try {
      setLoading(true);
      setStatus('Active');
      const response = await axios.post(`${API_BASE_URL}/camera/${selectedCamera.id}/activate`, { resolution });
      setSelectedCamera(response.data);
      setStatus(response.data.status);
      setIsRecording(response.data.isRecording);
    } catch (error) {
      setError(`Failed to activate camera: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!selectedCamera) {
      setError("No camera selected");
      return;
    }

    try {
      setLoading(true);
      setStatus('Inactive');
      const response = await axios.post(`${API_BASE_URL}/camera/${selectedCamera.id}/deactivate`);
      setSelectedCamera(response.data);
      setStatus(response.data.status);
      setIsRecording(response.data.isRecording);
    } catch (error) {
      setError(`Failed to deactivate camera: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-management-container p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Camera Management</h1>

      <div className="control-panel bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <select
            onChange={(e) => handleCameraSelect(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={selectedCamera ? selectedCamera.id : ''}
          >
            <option value="">Select a camera</option>
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.name}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleActivate}
              className={`flex items-center px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-200 ${isRecording ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
              disabled={isRecording}
            >
              <FaPlay className="mr-2" /> Activate Recording
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeactivate}
              className={`flex items-center px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-200 ${!isRecording ? 'bg-gray-400' : 'bg-red-500 text-white'}`}
              disabled={!isRecording}
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

      {loading && <div className="loading">Loading...</div>}

      <div className="live-feed bg-gray-200 rounded-lg p-8 flex items-center justify-center text-gray-400 text-xl">
        Live Camera Feed - Camera 1
      </div>

      {error && (
        <div className="error-message text-red-500 mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default CameraManagement;
