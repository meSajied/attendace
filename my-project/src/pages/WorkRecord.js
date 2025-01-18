import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";

function WorkRecord() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkRecords();
    }, []);

    function fetchWorkRecords(url = "/work-records") {
        setLoading(true);
        axiosInstance.get(url)
            .then((response) => {
                const formattedData = formatWorkTimeData(response.data);
                setRecords(formattedData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }

    // Function to format work time data
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

            return record;
        });
    }

    function FetchThisWeek() {
        fetchWorkRecords("/work-records/week");
    }

    function FetchThisMonth() {
        fetchWorkRecords("/work-records/month");
    }

    function FetchToday() {
        fetchWorkRecords("/work-records/today");
    }

    // Handling loading and error states
    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error fetching data!</div>;
    }

    return (
        <div className="flex">
            <div className="w-1/6 p-4 space-y-4">
                <Link
                    to="/work-record"
                    className="block text-blue-500 hover:text-blue-700"
                >
                    Get All Work Records
                </Link>
                <Link
                    to="/employee"
                    className="block text-blue-500 hover:text-blue-700"
                >
                    Employee All
                </Link>
                <Link
                    to="/admin/employee/add"
                    className="block text-blue-500 hover:text-blue-700"
                >
                    Add Employee
                </Link>
            </div>

            <div className="w-4/6 p-3">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-semibold text-center mb-4">Work Records</h1>

                    <div className="flex justify-center space-x-3 text-xl">
                        <div>
                            <button className="border-2 rounded border-blue-200" onClick={FetchThisWeek}>
                                This Week
                            </button>
                        </div>
                        <div>
                            <button className="border-2 rounded border-blue-200" onClick={FetchThisMonth}>
                                This Month
                            </button>
                        </div>
                        <div>
                            <button className="border-2 rounded border-blue-200" onClick={FetchToday}>
                                Today
                            </button>
                        </div>
                    </div>

                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Office Type</th>
                            <th className="border px-4 py-2">Out Time</th>
                            <th className="border px-4 py-2">In Time</th>
                            <th className="border px-4 py-2">Employee Email</th>
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
                                <td className="border px-4 py-2">
                                    <a href={`/check-in/${record.employee.id}`}
                                       className="text-blue-500 hover:underline">
                                        {record.employee.email}
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default WorkRecord;
