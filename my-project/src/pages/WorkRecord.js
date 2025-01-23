import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import { Header } from "../components/Header";
import { AdminLeftSidebar } from "../components/AdminLeftSidebar";
import { Ztrios } from "../components/Ztrios";
import { useAuth } from "../account/Authentication";
import LoadingPage from "./LoadingPage";

function WorkRecord() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAdminLoggedIn } = useAuth();

    useEffect(() => {
        fetchWorkRecords();
    }, []);

    function fetchWorkRecords(url = `/work-records/${Number(id)}`) {
        setLoading(true);
        axiosInstance.get(url)
            .then((response) => {
                const { name, email, workEmail, id, workRecord } = response.data;
                setUserInfo({ name, email, workEmail, id });
                const formattedRecords = formatWorkTimeData(workRecord);
                setRecords(formattedRecords);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
                setLoading(false);
            });
    }

    function formatWorkTimeData(data) {
        return data.map((record) => {
            const workTime = record.workTime;
            let workHour = Math.floor(workTime / 60);
            let workMinute = workTime % 60;
            record.workTime = `${workHour} hour(s) and ${workMinute} minute(s)`;

            const outTime = record.outTime;
            let outHour = Math.floor(outTime / 60);
            let outMinute = outTime % 60;
            record.outTime = `${outHour} hour(s) and ${outMinute} minute(s)`;

            let startdate = new Date(record.startTime);
            record.startTime = startdate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            let endtdate = new Date(record.endTime);
            record.endTime = endtdate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            return record;
        });
    }

    function FetchThisWeek() {
        fetchWorkRecords(`/work-records/${Number(id)}/week`);
    }

    function FetchThisMonth() {
        fetchWorkRecords(`/work-records/${Number(id)}/month`);
    }

    function FetchToday() {
        fetchWorkRecords(`/work-records/${Number(id)}/today`);
    }

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error fetching data!</div>;
    }

    return (
        <div className="flex h-screen">
            {isAdminLoggedIn ? <AdminLeftSidebar /> : null}

            <div className="w-[85%] p-3">
                <Header />

                <div className="flex flex-col items-center p-4 container mx-auto">
                    <h1 className="text-2xl font-semibold text-center mb-4">Work Records of</h1>

                    {userInfo && (
                        <div className="flex flex-col items-start font-chakra font-semibold border-2 rounded-md border-black p-3 mb-3">
                            <div>Id: {userInfo.id}</div>
                            <div>Name: {userInfo.name}</div>
                            <div>Email: {userInfo.email}</div>
                            <div>Work Email: {userInfo.workEmail}</div>
                        </div>
                    )}

                    <div className="flex justify-center space-x-3 text-xl p-3">
                        <button className="rounded-md p-1 bg-black text-white" onClick={FetchThisWeek}>
                            This Week
                        </button>
                        <button className="rounded-md p-1 bg-black text-white" onClick={FetchThisMonth}>
                            This Month
                        </button>
                        <button className="rounded-md p-1 bg-black text-white" onClick={FetchToday}>
                            Today
                        </button>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Office Type</th>
                                <th className="border px-4 py-2">Out Time</th>
                                <th className="border px-4 py-2">Work Time</th>
                                <th className="border px-4 py-2">Start Time</th>
                                <th className="border px-4 py-2">End Time</th>
                                <th className="border px-4 py-2">Check-Ins</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records.map((record) => (
                                <tr key={record.id} className="border-t">
                                    <td className="border px-4 py-2">{record.id}</td>
                                    <td className="border px-4 py-2">{record.date}</td>
                                    <td className="border px-4 py-2">{record.officeType}</td>
                                    <td className="border px-4 py-2">{record.outTime}</td>
                                    <td className="border px-4 py-2">{record.workTime}</td>
                                    <td className="border px-4 py-2">{record.startTime}</td>
                                    <td className="border px-4 py-2">{record.endTime}</td>
                                    <td className="border px-4 py-2">
                                        <Link to={`/check-in/${Number(userInfo.id)}?date=${record.date}`} className="text-blue-500 hover:underline">
                                            View Check-Ins
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkRecord;
