import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../axiosInstance";
import {useAuth} from "../account/Authentication";

const AdminLogin = () => {

    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.get("/send-sms", {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    phone: phone
                }
            });
            console.log(response.data);
            if (response.status === 200) {

                navigate("/admin/code");
            }
        }catch(error) {
            setError("Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full sm:w-96 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-gray-700 font-semibold">Enter Number</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
