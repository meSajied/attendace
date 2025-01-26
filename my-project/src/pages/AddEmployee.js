import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {axiosInstance} from "../axiosInstance";
import {Header} from "../components/Header";
import {AdminLeftSidebar} from "../components/AdminLeftSidebar";
import {Loading} from "../components/Loading";

function AddEmployee() {
    const [employeeData, setEmployeeData] = useState({
        id: '',
        username: '',
        name: '',
        email: '',
        workEmail: '',
        password: '',
        phone: '',
        gender: '',
        department: '',
        designation: '',
        supervisor: '',
        joiningDate: '',
    });
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const parsedValue = (name === 'id') ? parseInt(value, 10) : value;

        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: parsedValue
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log(employeeData)
            await axiosInstance.post("/employee", employeeData);
            navigate("/admin/employee");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <AdminLeftSidebar />

            <div className="w-4/6 p-4">
                <div>
                    <Header />
                </div>
                <div className="space-y-3 p-4 sm:p-2">
                    <h2 className="text-xl font-bold text-center mb-4">Add a Employee</h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex flex-col items-center font-josefin space-y-3 px-4 sm:px-6">
                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center">
                                <label htmlFor="id" className="text-sm">ID:</label>
                                <input name="id" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.id} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center">
                                <label htmlFor="username" className="text-sm">Username:</label>
                                <input name="username" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.username} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center">
                                <label htmlFor="name" className="text-sm">Name:</label>
                                <input name="name" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.name} onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center">
                                <label htmlFor="gender" className="text-sm">Gender</label>
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

                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                <label htmlFor="email" className="text-sm">Email:</label>
                                <input name="email" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.email} onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                <label htmlFor="workEmail" className="text-sm">Work Email:</label>
                                <input name="workEmail" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.workEmail} onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                <label htmlFor="password" className="text-sm">Password:</label>
                                <input name="password" type="password" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.password} onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                <label htmlFor="designation" className="text-sm">Designation:</label>
                                <input name="designation" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.designation} onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                <label htmlFor="department" className="text-sm">Department:</label>
                                <input name="department" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.department} onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                <label htmlFor="supervisor" className="text-sm">Supervisor:</label>
                                <input name="supervisor" className="border rounded border-black p-2 text-center w-full"
                                       value={employeeData.supervisor} onChange={handleChange}/>
                            </div>

                            <div className="flex justify-around items-center space-x-4 sm:space-x-8">
                                {isLoading ? (
                                    <button type="submit"
                                            className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">
                                        <Loading/></button>
                                ) : (
                                    <button type="submit"
                                            className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">Save</button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export {AddEmployee};
