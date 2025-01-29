import React, { useState, useEffect } from 'react';
import {Loading} from "./Loading";

const ProfileForm = ({ userData, onSubmit, isLoading, isEditing, onToggleEditing }) => {
    const [formData, setFormData] = useState(userData);

    useEffect(() => {
        setFormData(userData);
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <div className="space-y-3">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col items-center font-josefin space-y-3 px-4 sm:px-6">
                        {Object.keys(formData).map((key) => {
                            if (key === 'id') return null; // Skip ID field from the form
                            return (
                                <div key={key} className="flex flex-col sm:w-1/2 space-x-2 items-center sm:items-start">
                                    <label htmlFor={key} className="text-sm">{key.replace(/([A-Z])/g, ' $1')}</label>
                                    {key === "gender" ? (
                                        <select
                                            id={key}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <input
                                            name={key}
                                            className="border rounded border-black p-2 text-center w-full"
                                            value={formData[key]}
                                            onChange={handleChange}
                                        />
                                    )}
                                </div>
                            );
                        })}

                        <div className="flex justify-around items-center space-x-4 sm:space-x-8">
                            {isLoading ? (
                                <button type="submit" className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">
                                    <Loading />
                                </button>
                            ) : (
                                <button type="submit" className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">Save</button>
                            )}

                            <button onClick={onToggleEditing} className="font-josefin text-end rounded-md bg-black text-white p-2 text-sm">Cancel</button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="font-josefin flex flex-col items-center justify-center space-y-2">
                    {Object.keys(formData).map((key) => {
                        if (key === 'id') return null; // Skip ID field from the view
                        return (
                            <div key={key}>
                                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {formData[key]}
                            </div>
                        );
                    })}
                    <div className="flex justify-center">
                        <button onClick={onToggleEditing} className="font-josefin text-end rounded-md bg-black text-white p-1 pl-2 pr-2 text-sm">
                            EDIT
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export {ProfileForm};
