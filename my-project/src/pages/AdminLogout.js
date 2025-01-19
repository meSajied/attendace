import React from "react";
import {Navigate} from "react-router";
import {useAuth} from "../account/Authentication";

const AdminLogout = () => {
    const {logoutAdmin} = useAuth();
    logoutAdmin();

    return(
        <Navigate to='/admin/login' />
    );
}

export {AdminLogout};