import React, { useState } from 'react';
import { useAuth } from '../account/Authentication';
import { axiosInstance } from '../axiosInstance';
import {ProfileForm} from "../components/ProfileForm";
import { Header } from '../components/Header';

const UserProfile = () => {
    const { user, login } = useAuth();
    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const credentials = user ? btoa(`${user.username}:${user.password}`) : '';

    const handleSubmit = async (updatedData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put('/employee/update', updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`
                }
            });
            if (response.status === 200) {
                login(response.data);
                setEditing(false);
            }
        } catch (error) {
            console.error('Could not update user', error);
            alert('Could not update user');
        } finally {
            setLoading(false);
        }
    };

    const toggleEditing = (e) => {
        e.preventDefault();
        setEditing(!isEditing);
    };

    return (
        <div className="space-y-3 p-4 sm:p-2">
            <Header />

            <div>
                <p className="font-chakra font-semibold text-center text-lg sm:text-xl">USER PROFILE</p>
            </div>

            <ProfileForm
                userData={user}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isEditing={isEditing}
                onToggleEditing={toggleEditing}
            />
        </div>
    );
};

export { UserProfile };
