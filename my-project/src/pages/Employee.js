import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import { AdminHeader } from "../components/AdminHeader";
import { AdminLeftSidebar } from "../components/AdminLeftSidebar";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [filterCriteria, setFilterCriteria] = useState({
        gender: "",
        department: "",
        designation: "",
        supervisor: "",
    });

    const [columnsVisibility, setColumnsVisibility] = useState({
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        department: true,
        designation: true,
        supervisor: true,
        joiningDate: true,
    });

    const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

    useEffect(() => {
        axiosInstance
            .get("employee/get-all")
            .then((response) => {
                setEmployees(response.data);
                setFilteredEmployees(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching employees data");
                setLoading(false);
            });
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleColumnVisibilityChange = (column) => {
        setColumnsVisibility((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const filterEmployees = () => {
        let filtered = employees;

        if (filterCriteria.gender) {
            filtered = filtered.filter((employee) =>
                employee.gender.toUpperCase() === filterCriteria.gender.toUpperCase()
            );
        }
        if (filterCriteria.department) {
            filtered = filtered.filter((employee) =>
                employee.department.toLowerCase().includes(filterCriteria.department.toLowerCase())
            );
        }
        if (filterCriteria.designation) {
            filtered = filtered.filter((employee) =>
                employee.designation.toLowerCase().includes(filterCriteria.designation.toLowerCase())
            );
        }
        if (filterCriteria.supervisor) {
            filtered = filtered.filter((employee) =>
                employee.supervisor.toLowerCase().includes(filterCriteria.supervisor.toLowerCase())
            );
        }
        if (filterCriteria.username) {
            filtered = filtered.filter((employee) =>
                employee.username.toLowerCase().includes(filterCriteria.username.toLowerCase())
            );
        }
        if (filterCriteria.name) {
            filtered = filtered.filter((employee) =>
                employee.name.toLowerCase().includes(filterCriteria.name.toLowerCase())
            );
        }
        if (filterCriteria.email) {
            filtered = filtered.filter((employee) =>
                employee.email.toLowerCase().includes(filterCriteria.email.toLowerCase())
            );
        }
        if (filterCriteria.phone) {
            filtered = filtered.filter((employee) =>
                employee.phone.toLowerCase().includes(filterCriteria.phone.toLowerCase())
            );
        }
        if (filterCriteria.joiningDate) {
            filtered = filtered.filter((employee) =>
                new Date(employee.joiningDate) >= new Date(filterCriteria.joiningDate)
            );
        }

        setFilteredEmployees(filtered);
    };

    useEffect(() => {
        filterEmployees();
    }, [filterCriteria]);

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
            <AdminLeftSidebar />

            <div
                className={`p-3 ${
                    drawerOpen ? "transform transition-transform duration-300 basis-4/6 w-[65%]" : "w-[85%]"
                }`}
            >
                <div>
                    <AdminHeader />
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-semibold text-center mb-6">Employee List</h1>

                    <div className="flex justify-between p-3">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
                        >
                            Filter Columns
                        </button>

                        <button
                            onClick={toggleDrawer}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Filter Rows
                        </button>
                    </div>

                    {isColumnDropdownOpen && (
                        <div className="absolute z-10 bg-white shadow-lg p-4 rounded-md mt-2">
                            <h3 className="text-lg font-semibold">Select Columns to Display</h3>
                            <div className="space-y-2">
                                {Object.keys(columnsVisibility).map((column) => (
                                    <div key={column} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={columnsVisibility[column]}
                                            onChange={() => handleColumnVisibilityChange(column)}
                                            className="mr-2"
                                        />
                                        <label>{column.charAt(0).toUpperCase() + column.slice(1)}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <table className="bg-white border border-gray-200 shadow-md w-full">
                            <thead>
                            <tr className="text-left bg-gray-100">
                                {columnsVisibility.id && <th className="p-4 text-sm font-semibold text-gray-700">ID</th>}
                                {columnsVisibility.username && <th className="p-4 text-sm font-semibold text-gray-700">Username</th>}
                                {columnsVisibility.name && <th className="p-4 text-sm font-semibold text-gray-700">Name</th>}
                                {columnsVisibility.email && <th className="p-4 text-sm font-semibold text-gray-700">Email</th>}
                                {columnsVisibility.phone && <th className="p-4 text-sm font-semibold text-gray-700">Phone</th>}
                                {columnsVisibility.gender && <th className="p-4 text-sm font-semibold text-gray-700">Gender</th>}
                                {columnsVisibility.department && <th className="p-4 text-sm font-semibold text-gray-700">Department</th>}
                                {columnsVisibility.designation && <th className="p-4 text-sm font-semibold text-gray-700">Designation</th>}
                                {columnsVisibility.supervisor && <th className="p-4 text-sm font-semibold text-gray-700">Supervisor</th>}
                                {columnsVisibility.joiningDate && <th className="p-4 text-sm font-semibold text-gray-700">Joining Date</th>}
                                <th className="p-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id} className="border-b hover:bg-gray-50">
                                    {columnsVisibility.id && <td className="p-4 text-sm text-gray-600">{employee.id}</td>}
                                    {columnsVisibility.username && <td className="p-4 text-sm text-gray-600">{employee.username}</td>}
                                    {columnsVisibility.name && <td className="p-4 text-sm text-gray-600">{employee.name}</td>}
                                    {columnsVisibility.email && <td className="p-4 text-sm text-gray-600">{employee.email}</td>}
                                    {columnsVisibility.phone && <td className="p-4 text-sm text-gray-600">{employee.phone}</td>}
                                    {columnsVisibility.gender && <td className="p-4 text-sm text-gray-600">{employee.gender}</td>}
                                    {columnsVisibility.department && <td className="p-4 text-sm text-gray-600">{employee.department}</td>}
                                    {columnsVisibility.designation && <td className="p-4 text-sm text-gray-600">{employee.designation}</td>}
                                    {columnsVisibility.supervisor && <td className="p-4 text-sm text-gray-600">{employee.supervisor}</td>}
                                    {columnsVisibility.joiningDate && <td className="p-4 text-sm text-gray-600">{employee.joiningDate}</td>}
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

            <div
                className={`bg-gray-50 text-black transform transition-transform duration-300 
        ${drawerOpen ? "translate-x-0 w-[20%]" : "translate-x-full w-[0%]"} flex flex-col space-y-3 p-4`}
            >
                <div className="p-4">
                    <div>
                        <h2 className="text-xl font-semibold">Filter Out</h2>
                    </div>

                    <div className="p-2 space-y-3">
                        <div className="flex space-x-2">
                            <label htmlFor="gender" className="text-xl">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={filterCriteria.gender}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md"
                            >
                                <option value="">All</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="username" className="text-xl">Username:</label>
                            <input
                                name="username"
                                value={filterCriteria.username}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="name" className="text-xl">Name:</label>
                            <input
                                name="name"
                                value={filterCriteria.name}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="email" className="text-xl">Email:</label>
                            <input
                                name="email"
                                value={filterCriteria.email}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="phone" className="text-xl">Phone:</label>
                            <input
                                name="phone"
                                value={filterCriteria.phone}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="department" className="text-xl">Department:</label>
                            <input
                                name="department"
                                value={filterCriteria.department}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="designation" className="text-xl">Designation:</label>
                            <input
                                name="designation"
                                value={filterCriteria.designation}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="supervisor" className="text-xl">Supervisor:</label>
                            <input
                                name="supervisor"
                                value={filterCriteria.supervisor}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <label htmlFor="joiningDate" className="text-xl">Joining Date:</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={filterCriteria.joiningDate}
                                onChange={handleFilterChange}
                                className="text-black border-2 border-black rounded-md w-full"
                            />
                        </div>

                        </div>
                    </div>
                </div>
            </div>
            );
            }

            export default Employee;
