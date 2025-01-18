import React, { useEffect, useState } from 'react';
import { useAuth } from "../account/Authentication";
import { axiosInstance } from "../axiosInstance";
import {useParams} from "react-router-dom";

const UpdateProfile = () => {
    const [employeeData, setEmployeeData] = useState({
        id: '',
        username: '',
        name: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        designation: '',
        supervisor: '',
        joiningDate: '',
    });
    const [loading, setLoading] = useState(true);
    const {username} = useParams();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axiosInstance.get(`/employee/${username}`);
                setEmployeeData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employee data", error);
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axiosInstance.put(`/employee/update`, employeeData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="max-w-sm mx-auto p-4">
            <h2 className="text-xl font-bold text-center mb-4">Update Profile</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={employeeData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={employeeData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={employeeData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={employeeData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={employeeData.department}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            value={employeeData.designation}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">Supervisor</label>
                        <input
                            type="text"
                            id="supervisor"
                            name="supervisor"
                            value={employeeData.supervisor}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">Joining Date</label>
                        <input
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                            value={employeeData.joiningDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { UpdateProfile };
