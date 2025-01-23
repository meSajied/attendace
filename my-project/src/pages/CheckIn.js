import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {axiosInstance} from "../axiosInstance";
import {Loading} from "../components/Loading";
import LoadingPage from "./LoadingPage";

function CheckIn() {
    const { id } = useParams();
    const queryParams = new URLSearchParams(useLocation().search);
    const date = queryParams.get('date');
    const [checkIns, setCheckIns] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const response = await axiosInstance.get(`/check-ins/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        date: date
                    }
                });
                console.log(response.data)
                setCheckIns(response.data);
            } catch (err) {
                setError('Failed to fetch check-ins.');
            } finally {
                setLoading(false);
            }
        };

        fetchCheckIns();
    }, []);

    console.log(date)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    if (isLoading) {
        return <LoadingPage />
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Check-ins for ID: {id}</h1>
            <div className="space-y-4">
                {checkIns.length === 0 ? (
                    <p>No check-ins found for this ID.</p>
                ) : (
                    checkIns.map((checkIn, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                            <p className="text-lg font-semibold">{"Check " + checkIn.checks}</p>
                            <p className="text-sm text-gray-500">Time: {formatDate(checkIn.time)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CheckIn;
