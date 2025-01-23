import {Link} from "react-router-dom";
import React from "react";
import {ADMIN_ADD_EMPLOYEE, ADMIN_DASHBOARD, ADMIN_EMPLOYEE_LIST} from "../routes";

function AdminLeftSidebar() {
    return (
        <div className=" w-[15%] p-4 space-y-4 bg-gray-200 flex flex-col text-xl font-space items-center h-screen">
            <Link
                to={ADMIN_EMPLOYEE_LIST}
                className="text-black hover:text-blue-700"
            >
                Employees
            </Link>
            <Link
                to={ADMIN_ADD_EMPLOYEE}
                className="text-black hover:text-blue-700"
            >
                Add Employee
            </Link>
        </div>

    )
}

export {AdminLeftSidebar};