import React from "react";
import {useAuth} from "../account/Authentication";
import {Navigate} from "react-router";

function RequiredAuthenticationAdmin({children}) {
    const {isAdminLoggedIn} = useAuth();

    return(
        isAdminLoggedIn ? children : <Navigate to='/admin/login' />
    )
}

export {RequiredAuthenticationAdmin};