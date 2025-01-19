import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Authentication";
import { axiosInstance } from "../axiosInstance";

export function Dashboard() {
    const [activeTab, setActiveTab] = useState("HOME");
    const { user } = useAuth();

    const [checkState, setCheckState] = useState("CHECK IN");
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleCheckState = async () => {
        const form = {
            time: new Date().toISOString(),
            officeType: activeTab,
            username: user.username,
            check: checkState.split(" ").slice(1).at(0),
        };

        try {
            console.log(form);
            setIsClicked(true);
            setIsLoading(true);
            const res = await axiosInstance.post("/check-in", form, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            setIsClicked(false);
            setIsLoading(false);

            if (res.status === 200) {
                setCheckState((prev) => (prev === "CHECK IN" ? "CHECK OUT" : "CHECK IN"));
            }
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    return (
        <div>
        <div className="flex justify-end space-x-2 p-3">
            <Link
                to="/profile"
                className="text-black text-2xl hover:underline text-lg font-semibold border-2 rounded p-1"
            >
                Profile
            </Link>
            <Link
                to="/logout"
                className="text-black text-2xl hover:underline text-lg font-semibold border-2 rounded p-1"
            >
                Logout
            </Link>
        </div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">

                <div className="flex border-b">
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === "HOME" ? "bg-red-400 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => setActiveTab("HOME")}
                    >
                        Home
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === "WORKPLACE" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
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
                        className={`w-32 h-32 text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 
                            ${isClicked ? "bg-red-500" : "bg-red-400"}`}
                    >
                        <span className="text-xl font-semibold">{isLoading? "Loading...":checkState}</span>
                    </button>
                </div>

            </div>
        </div>
        </div>
    );
}
