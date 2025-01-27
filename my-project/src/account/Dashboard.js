import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Authentication";
import { axiosInstance } from "../axiosInstance";
import { Ztrios } from "../components/Ztrios";
import { Loading } from "../components/Loading";
import LoadingPage from "../pages/LoadingPage";

export function Dashboard() {
    const { user } = useAuth();

    const [checkState, setCheckState] = useState("CHECK IN");
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setPageLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState({ date: "", day: "", time: "" });

    useEffect(() => {
        const checkTime = () => {
            const currentDateTime = getCurrentDateTime();
            setCurrentDateTime(currentDateTime);
        };

        checkTime();
        const interval = setInterval(checkTime, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const FetchLastCheckIn = async () => {
            try {
                setPageLoading(true);
                let response = await axiosInstance.get(`/check-ins/${Number(user?.id)}/last`)
                console.log(response.data);
                if (response.data === null) {
                    setCheckState("CHECK IN");
                }

                if (response.data?.checks) {
                    setCheckState(response.data?.checks === "IN" ? "CHECK OUT" : "CHECK IN");
                }
            }catch (e) {
                console.log(e)
            }finally {
                setPageLoading(false);
            }

        }

        FetchLastCheckIn();
    }, [])

    function getCurrentDateTime() {
        const now = new Date();

        const date = now.toISOString().split('T')[0];
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[now.getDay()];

        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const time = hours + ':' + minutes + ' ' + ampm;

        return {
            date: date,
            day: dayOfWeek,
            time: time
        };
    }

    const toggleCheckState = async () => {
        const form = {
            time: new Date().toISOString(),
            username: user.username,
            check: checkState.split(" ").slice(1).at(0),
        };

        try {
            console.log(form);
            setIsLoading(true);
            const response = await axiosInstance.post("/check-in", form, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setCheckState(response.data?.checks === "IN" ? "CHECK OUT" : "CHECK IN");
            }
        } catch (error) {
            console.error('Error checking in:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isPageLoading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <div className="flex justify-between items-center p-3 bg-white shadow-md">
                <Ztrios />
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-lg p-2 text-black rounded-md sm:hidden"
                    >
                        ☰
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40">
                            <Link to="/profile" className="block p-2 text-black hover:bg-gray-200">
                                Profile
                            </Link>
                            <Link to={`/work-record/${Number(user?.id)}`} className="block p-2 text-black hover:bg-gray-200">
                                Report
                            </Link>
                            <Link to="/logout" className="block p-2 text-black hover:bg-gray-200">
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
                <div className="hidden sm:flex space-x-4 text-lg font-semibold">
                    <Link to="/profile" className="text-black p-2 hover:bg-gray-200 rounded-md">
                        Profile
                    </Link>
                    <Link to={`/work-record/${Number(user?.id)}`} className="block p-2 text-black hover:bg-gray-200">
                        Report
                    </Link>
                    <Link to="/logout" className="text-black p-2 hover:bg-gray-200 rounded-md">
                        Logout
                    </Link>
                </div>
            </div>

            <div className="h-screen flex flex-col items-center justify-center space-y-3 bg-gray-100 p-4">

                <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">
                    <div className="flex text-left w-full p-2 pl-5 pr-5">
                        <p className="font-josefin text-xl">Hello, {user?.name}</p>
                    </div>

                    <div className="p-4 text-center">
                        <p className="font-chakra text-lg">{currentDateTime.day}, {currentDateTime.date}</p>
                        <p className="font-chakra text-xl">{currentDateTime.time}</p>
                    </div>

                    <div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-chakra font-semibold">Click the toggle button to...</p>
                        </div>
                        <div className="flex justify-center p-6">
                            <button
                                onClick={toggleCheckState}
                                className={`w-32 h-32 text-white rounded-full flex items-center justify-center transition-all transform
                ${isLoading ? "bg-red-500" : "bg-red-400 shadow-black shadow-md"}`}
                            >
                                {isLoading ? (
                                    <Loading/>
                                ) : (
                                    <span className="text-xl font-space font-semibold">{checkState}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
