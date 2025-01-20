import {Link} from "react-router-dom";
import React from "react";

function AdminHeader() {
    return (
        <div className="flex justify-between p-3">
            <div className="flex space-x-3 items-center">
                <img src="/ztrios_logo.jpg" width="60" height="60" alt="ztrios"/>
                <div className="font-bold">ZTRIOS</div>
            </div>
            <div>
                <Link to="/admin/logout"
                      className="text-xl bg-red-500 text-white rounded-md p-1 pl-2 pr-2">Logout</Link>
            </div>
        </div>
    )
}

export {AdminHeader};