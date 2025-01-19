import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../axiosInstance";

function AddEmployee() {
    const [employeeData, setEmployeeData] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdd = async () => {
        try {
            console.log(employeeData)
            await axiosInstance.post("/employee", employeeData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/6 p-4 space-y-4 bg-gray-200 flex flex-col text-xl items-center">
                <Link
                    to="/admin"
                    className="text-black hover:text-blue-700"
                >
                    Get All Work Records
                </Link>
                <Link
                    to="/employee"
                    className="text-black hover:text-blue-700"
                >
                    Employee All
                </Link>
                <Link
                    to="/admin/employee/add"
                    className="text-black hover:text-blue-700"
                >
                    Add Employee
                </Link>
            </div>

            <div className="w-4/6 p-4 w-full">
                <div className="flex justify-end p-3">
                    <Link to="/admin/logout" className="text-xl bg-red-500 rounded-md p-1 pl-2 pr-2">Logout</Link>
                </div>
                <div className="max-w-sm mx-auto p-4">
                    <h2 className="text-xl font-bold text-center mb-4">Add a Employee</h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="name"
                                       className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={employeeData.username}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
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
                                <label htmlFor="password"
                                       className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={employeeData.password}
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
                                <label htmlFor="gender"
                                       className="block text-sm font-medium text-gray-700">Gender</label>
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
                                <label htmlFor="department"
                                       className="block text-sm font-medium text-gray-700">Department</label>
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
                                <label htmlFor="designation"
                                       className="block text-sm font-medium text-gray-700">Designation</label>
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
                                <label htmlFor="supervisor"
                                       className="block text-sm font-medium text-gray-700">Supervisor</label>
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
                                <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">Joining
                                    Date</label>
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
                                    onClick={handleAdd}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {AddEmployee};
