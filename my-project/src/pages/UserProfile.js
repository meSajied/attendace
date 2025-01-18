import React, { useState } from 'react';
import { useAuth } from "../account/Authentication";
import {axiosInstance} from "../axiosInstance";

const UserProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        id: user.id,
        username: user.username,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        department: user.department || '',
        designation: user.designation || '',
        supervisor: user.supervisor || '',
        joiningDate: user.joiningDate
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put('/employee/update', formData);
            if (response.status === 200) {
                alert('Profile updated successfully');
            }
        } catch (error) {
            alert('Failed to update profile');
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Supervisor</label>
                        <input
                            type="text"
                            name="supervisor"
                            value={formData.supervisor}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 rounded"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export { UserProfile };
