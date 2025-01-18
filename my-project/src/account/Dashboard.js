import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Authentication";
import { axiosInstance } from "../axiosInstance";

export function Dashboard() {
    const [activeTab, setActiveTab] = useState("HOME");
    const { user } = useAuth();

    const [checkState, setCheckState] = useState("CHECK IN");

    const toggleCheckState = async () => {
        const form = {
            time: new Date().toISOString(),
            officeType: activeTab,
            username: user.username,
            check: checkState.split(" ").slice(1).at(0),
        };

        try {
            console.log(form);
            const res = await axiosInstance.post("/check-in", form, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                setCheckState((prev) => (prev === "CHECK IN" ? "CHECK OUT" : "CHECK IN"));
            }
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">

                {/* Logout link */}
                <div className="py-2 px-4 flex justify-end">
                    <Link
                        to="/logout"
                        className="text-red-500 hover:underline text-lg font-semibold"
                    >
                        Logout
                    </Link>
                </div>

                <div className="flex border-b">
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === "HOME" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => setActiveTab("HOME")}
                    >
                        Home
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === "WORKPLACE" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => setActiveTab("WORKPLACE")}
                    >
                        Office
                    </button>
                </div>

                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Current Tab: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h2>
                </div>

                <div className="flex justify-center py-6">
                    <button
                        onClick={toggleCheckState}
                        className="w-32 h-12 bg-blue-500 text-white rounded-md flex items-center
                            justify-center shadow-lg transition-all transform hover:scale-105"
                    >
                        <span className="text-xl font-semibold">{checkState}</span>
                    </button>
                </div>

                <div className="flex justify-center py-4">
                    <Link
                        to="/profile"
                        className="text-blue-500 hover:underline text-lg font-semibold"
                    >
                        Go to Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
