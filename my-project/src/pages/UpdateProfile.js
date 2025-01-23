import React, { useEffect, useState } from 'react';
import { useAuth } from "../account/Authentication";
import { axiosInstance } from "../axiosInstance";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Ztrios} from "../components/Ztrios";
import {USER_LOGOUT} from "../routes";
import {Loading} from "../components/Loading";
import LoadingPage from "./LoadingPage";

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
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
    const [isLoading, setLoading] = useState(true);
    const [isEditing, setEditing] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/employee/id/${Number(id)}`);
                setFormData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employee data", error);
                setLoading(false);
            }finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEmployeeData();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axiosInstance.put(`/employee/update`, formData);
            navigate("/admin/employee");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        }
    };

    function toggleEditing(e) {
        e.preventDefault();
        setEditing(!isEditing);
    }


    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="space-y-3 p-4 sm:p-2">
            <div className="p-2 flex justify-between items-center">
                <div>
                    <Link to="/"><Ztrios/></Link>
                </div>

                <div className="mr-2">
                    <Link to={USER_LOGOUT}
                          className="text-white border rounded bg-black p-2 text-xs sm:text-sm">Logout</Link>
                </div>
            </div>

            <div>
                <p className="font-chakra font-semibold text-center text-lg sm:text-xl">USER PROFILE</p>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col items-center font-josefin space-y-3 px-4 sm:px-6">
                        <div className="flex flex-col sm:w-1/2 space-x-2 items-center">
                            <label htmlFor="name" className="text-sm">Name:</label>
                            <input name="name" className="border rounded border-black p-2 text-center w-full"
                                   value={formData.name} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col sm:w-1/2 space-x-2 items-center">
                            <label htmlFor="gender" className="text-sm">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
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
                                   value={formData.email} onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                            <label htmlFor="designation" className="text-sm">Designation:</label>
                            <input name="designation" className="border rounded border-black p-2 text-center w-full"
                                   value={formData.designation} onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                            <label htmlFor="department" className="text-sm">Department:</label>
                            <input name="department" className="border rounded border-black p-2 text-center w-full"
                                   value={formData.department} onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                            <label htmlFor="supervisor" className="text-sm">Supervisor:</label>
                            <input name="supervisor" className="border rounded border-black p-2 text-center w-full"
                                   value={formData.supervisor} onChange={handleChange}/>
                        </div>

                        <div className="flex justify-around items-center space-x-4 sm:space-x-8">
                            {isLoading ? (
                                <button
                                        className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">
                                    <Loading/></button>
                            ) : (
                                <button type="submit"
                                        className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">Save</button>
                            )}

                            <button onClick={toggleEditing}
                                    className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">Cancel
                            </button>
                        </div>
                    </div>
                </form>
            ) : (

                <form className="space-y-3">
                    <div className="font-josefin flex flex-col items-center justify-center space-y-2">
                        <div>Name: {formData.name}</div>
                        <div>Email: {formData.email}</div>
                        <div>Phone: {formData.phone}</div>
                        <div>Gender: {formData.gender}</div>
                        <div>Designation: {formData.designation}</div>
                        <div>Department: {formData.department}</div>
                        <div>Supervisor: {formData.supervisor}</div>
                        <div>Date of Join: {formData.joiningDate}</div>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={toggleEditing}
                                className="font-josefin text-end rounded-md bg-black text-white p-1 pl-2 pr-2 text-sm">EDIT
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export {UpdateProfile};
