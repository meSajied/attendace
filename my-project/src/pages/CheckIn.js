import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {axiosInstance} from "../axiosInstance";

function CheckIn() {
    const { id } = useParams();
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch check-in data when the component mounts or id changes
    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const response = await axiosInstance.get(`/check-ins/${id}`);
                console.log(response.data)
                setCheckIns(response.data);
            } catch (err) {
                setError('Failed to fetch check-ins.');
            } finally {
                setLoading(false);
            }
        };

        fetchCheckIns();
    }, [id]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
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
                            <p className="text-lg font-semibold">{checkIn.checks}</p>
                            <p className="text-sm text-gray-500">Time: {checkIn.time}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CheckIn;
