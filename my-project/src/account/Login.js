import React, { useState } from "react";
import { useAuth } from "./Authentication";
import { Navigate } from "react-router";
import { axiosInstance } from "../axiosInstance";
import {Loading} from "../components/Loading";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const { login, isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-6">
                {showWarning && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex">
                        <p>Login failed. Please check your credentials and try again.</p>
                        <span
                            className="ml-auto cursor-pointer"
                            onClick={() => setShowWarning(false)}
                        >
                            &times;
                        </span>
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setLoading(true);
            await axiosInstance
                .post('/employee/login', formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data?.username) {
                        login(res.data);
                        console.log(res.data);
                    } else {
                        setShowWarning(true);
                    }

                    clearData();
                });
        } catch (e) {
            console.log(e);
            clearData();
            setShowWarning(true);
        }finally {
            setLoading(false);
        }
    }

    function clearData() {
        setFormData({
            username: "",
            password: ""
        });
    }
};

export default Login;
