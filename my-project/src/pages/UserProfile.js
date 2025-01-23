import React, { useState } from 'react';
import { useAuth } from "../account/Authentication";
import { axiosInstance } from "../axiosInstance";
import { Ztrios } from "../components/Ztrios";
import { Link } from "react-router-dom";
import { USER_LOGOUT } from "../routes";
import {Loading} from "../components/Loading";
import {Header} from "../components/Header";

const UserProfile = () => {
    const { user, login } = useAuth();
    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: user.id,
        username: user.username,
        name: user.name || "N/A",
        email: user.email || "N/A",
        phone: user.phone || "N/A",
        gender: user.gender || "N/A",
        department: user.department || "N/A",
        designation: user.designation || "N/A",
        supervisor: user.supervisor || "N/A",
        joiningDate: user.joiningDate
    });

    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(e, url="/employee/update") {
        e.preventDefault();
        setLoading(true);
        await axiosInstance.put(url, formData)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    login(res.data);
                    setEditing(!isEditing);
                }
            }).catch(err => {
                console.log(err)
                alert("Could not update user");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function toggleEditing(e) {
        e.preventDefault();
        setEditing(!isEditing);
    }



    return (
        <div className="space-y-3 p-4 sm:p-2">
            <Header />

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
                                <button type="submit"
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

export {UserProfile};
