import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { axiosInstance } from '../axiosInstance';
import { Ztrios } from '../components/Ztrios';
import { USER_LOGOUT } from '../routes';
import {ProfileForm} from "../components/ProfileForm";
import {LoadingPage} from "./LoadingPage";

const UpdateProfile = () => {
    const [isLoading, setLoading] = useState(true);
    const [isEditing, setEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axiosInstance.get(`/employee/id/${Number(id)}`);
                setEmployeeData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee data', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchEmployeeData();
        }
    }, []);

    const handleSubmit = async (updatedData) => {
        try {
            await axiosInstance.put(`/employee/update`, updatedData);
            navigate('/admin/employee');
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile.');
        }
    };

    const toggleEditing = (e) => {
        e.preventDefault();
        setEditing(!isEditing);
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="space-y-3 p-4 sm:p-2">
            <div className="p-2 flex justify-between items-center">
                <div>
                    <Ztrios />
                </div>
                <div className="mr-2">
                    <Link to={USER_LOGOUT} className="text-white border rounded bg-black p-2 text-xs sm:text-sm">
                        Logout
                    </Link>
                </div>
            </div>

            <div>
                <p className="font-chakra font-semibold text-center text-lg sm:text-xl">USER PROFILE</p>
            </div>

            <ProfileForm
                userData={employeeData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isEditing={isEditing}
                onToggleEditing={toggleEditing}
            />
        </div>
    );
};

export { UpdateProfile };
