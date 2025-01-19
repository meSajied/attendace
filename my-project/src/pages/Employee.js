import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../axiosInstance";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance
            .get("employee/get-all")
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching employees data");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center text-lg text-gray-600">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-lg text-red-600">
                <p>{error}</p>
            </div>
        );
    }


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
                    to="/admin/employee"
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

            <div className="w-4/6 p-3 w-full">
                <div className="flex justify-end p-3">
                    <Link to="/admin/logout" className="text-xl bg-red-500 text-white rounded-md p-1 pl-2 pr-2">Logout</Link>
                </div>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-semibold text-center mb-6">Employee List</h1>

                    <div className="sm:block hidden">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md">
                            <thead>
                            <tr className="text-left bg-gray-100">
                                <th className="p-4 text-sm font-semibold text-gray-700">ID</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Username</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Name</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Email</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Phone</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Gender</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Department</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Designation</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Supervisor</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Joining Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-sm text-gray-600">{employee.id}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.username}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.name}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.email}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.phone}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.gender}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.department}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.designation}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.supervisor}</td>
                                    <td className="p-4 text-sm text-gray-600">{employee.joiningDate}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <Link
                                            to={`/check-in/${employee.id}`}
                                            className="text-blue-500 hover:underline mr-4"
                                        >
                                            Check-in
                                        </Link>
                                        <Link
                                            to={`/update/${employee.username}`}
                                            className="text-blue-500 hover:underline mr-4"
                                        >
                                            Update
                                        </Link>
                                        <Link
                                            to={`/admin/employee/delete/${employee.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Delete
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

export default Employee;
