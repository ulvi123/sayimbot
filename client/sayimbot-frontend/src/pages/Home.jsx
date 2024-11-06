import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100">
      <section className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white text-center p-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to Sayarbot</h1>
        <p className="text-lg mb-6">Your ultimate data management solution.</p>
        <div>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;