import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-6 py-4 text-left bg-white shadow-lg rounded-md w-80">
                <h3 className="text-xl font-semibold text-center mb-4">Register</h3>
                <form action="">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input type="text" placeholder="Email"
                            className="w-full px-3 py-1 mt-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder="Password"
                            className="w-full px-3 py-1 mt-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password"
                            className="w-full px-3 py-1 mt-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button className="px-4 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Register</button>
                        <Link to="/login" className="text-xs text-blue-600 hover:underline">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}