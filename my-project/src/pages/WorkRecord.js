import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import { Header } from "../components/Header";
import { AdminLeftSidebar } from "../components/AdminLeftSidebar";
import { Ztrios } from "../components/Ztrios";
import { useAuth } from "../account/Authentication";
import LoadingPage from "./LoadingPage";
import {Loading} from "../components/Loading";

function WorkRecord() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [records, setRecords] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDateInvalid, setDateInvalid] = useState(false);
    const [date, setDate] = useState({
        month: "",
        year: "",
    });
    const { isAdminLoggedIn } = useAuth();

    useEffect(() => {
        fetchWorkRecords();
    }, []);

    function fetchWorkRecords(url = `/work-records/${Number(id)}`, date) {
        setLoading(true);
        axiosInstance.get(url, {
            params: {
                date: date
            }
        })
            .then((response) => {
                if (response.data) {
                    const { name, email, workEmail, id, workRecord } = response.data;
                    setUserInfo({ name, email, workEmail, id });
                    const formattedRecords = formatWorkTimeData(workRecord);
                    setRecords(formattedRecords);
                } else {
                    setRecords([]);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            }).finally(() => {
                setLoading(false);
        });
    }

    function formatWorkTimeData(data) {
        return data && data.map((record) => {
            const workTime = record.workTime;
            let workHour = Math.floor(workTime / 60);
            let workMinute = workTime % 60;
            record.workTime = `${workHour} hour(s) and ${workMinute} minute(s)`;

            const outTime = record.outTime;
            let outHour = Math.floor(outTime / 60);
            let outMinute = outTime % 60;
            record.outTime = `${outHour} hour(s) and ${outMinute} minute(s)`;

            let startdate = new Date(record.startTime);
            record.startTimeFormatted = startdate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

            let endtdate = new Date(record.endTime);
            record.endTimeFormatted = endtdate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

            return record;
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDate((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formDate = new Date(`${date.year}-${date.month}-01`);

        if (isNaN(formDate.getTime())) {
           setDateInvalid(true);
        } else {
            formDate = formDate.toISOString().slice(0, 10);
            setDateInvalid(false);
            FetchThisMonth(formDate)
        }
    }

    function FetchThisMonth(formDate) {
        fetchWorkRecords(`/work-records/${Number(id)}/month`, formDate);
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error fetching data!</div>;
    }

    return (
        <div className="flex h-screen">
            {isAdminLoggedIn ? <AdminLeftSidebar /> : null}

            <div className="w-[85%] p-3 w-full">
                <Header />

                <div className="flex flex-col items-center space-y-3 p-4 container mx-auto">
                    <h1 className="text-2xl font-semibold text-center mb-4">Work Records of</h1>

                    {userInfo && (
                        <div>
                            <div
                                className="flex flex-col items-start font-chakra font-semibold border-2 rounded-md border-black p-3 mb-3">
                                <div>Id: {userInfo.id}</div>
                                <div>Name: {userInfo.name}</div>
                                <div>Email: {userInfo.email}</div>
                                <div>Work Email: {userInfo.workEmail}</div>
                            </div>
                            {isDateInvalid && <div className="flex justify-center font-nunito font-semibold text-red-700 text-2xl">Invalid Date</div>}
                        </div>

                    )}

                    <form onSubmit={handleSubmit}
                          className="flex justify-center space-x-3 items-center font-josefin pl-2 pr-2">
                        <div>
                            <label htmlFor="month" className="text-sm">Month</label>
                            <select
                                name="month"
                                value={date.month}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-x-2 items-center sm:items-start">
                            <label htmlFor="year" className="text-sm">Year:</label>
                            <input name="year" className="border rounded border-black p-2 text-center"
                                   value={date.email} onChange={handleChange} />
                        </div>

                        <div className="flex space-x-4 sm:space-x-8 mt-5">
                            {isLoading ? (
                                <button
                                    className="font-josefin text-center rounded-md bg-black text-white p-2">
                                    <Loading/></button>
                            ) : (
                                <button type="submit"
                                        className="font-josefin text-center rounded-md bg-black text-white p-2">Filter</button>
                            )}
                        </div>
                    </form>

                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Out Time</th>
                                <th className="border px-4 py-2">Work Time</th>
                                <th className="border px-4 py-2">Start Time</th>
                                <th className="border px-4 py-2">End Time</th>
                                <th className="border px-4 py-2">Check-Ins</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records && records.map((record) => {
                                const startTime = new Date(record.startTime);

                                const tenAM = new Date();
                                tenAM.setHours(10, 0, 0, 0);

                                let isAfterTenAM = startTime.getTime() > tenAM.getTime();


                                return (
                                    <tr key={record.id} className="border-t">
                                        <td className="border px-4 py-2">{record.id}</td>
                                        <td className="border px-4 py-2">{record.date}</td>
                                        <td className="border px-4 py-2">{record.outTime}</td>
                                        <td className="border px-4 py-2">{record.workTime}</td>
                                        <td className={`border px-4 py-2 ${isAfterTenAM ? 'text-red-500' : ''}`}>
                                            {record.startTimeFormatted}
                                        </td>
                                        <td className="border px-4 py-2">{record.endTimeFormatted}</td>
                                        <td className="border px-4 py-2">
                                            <Link to={`/check-in/${Number(userInfo.id)}?date=${record.date}`}
                                                  className="text-blue-500 hover:underline">
                                                View Check-Ins
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkRecord;
