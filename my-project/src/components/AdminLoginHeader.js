import { Link, useLocation } from "react-router-dom";
import { ADMIN_LOGIN, ADMIN_REGISTER, USER_LOGIN } from "../routes";
import { Ztrios } from "./Ztrios";

function AdminLoginHeader() {
    const location = useLocation();

    return (
        <div className="flex justify-between font-nunito p-3">
            <Ztrios />
            <div>
                <div>
                    <Link to={USER_LOGIN} className="text-xl text-black rounded-md p-1 pl-2 pr-2 underline">
                        User Login
                    </Link>

                    {location.pathname === ADMIN_REGISTER && (
                        <Link to={ADMIN_LOGIN} className="text-xl text-black rounded-md p-1 pl-2 pr-2 underline">
                            Admin Login
                        </Link>
                    )}

                    {location.pathname === ADMIN_LOGIN && (
                        <Link to={ADMIN_REGISTER} className="text-xl text-black rounded-md p-1 pl-2 pr-2 underline">
                            Admin Register
                        </Link>
                    )}

                    {location.pathname !== ADMIN_REGISTER && location.pathname !== ADMIN_LOGIN && (
                        <>
                            <Link to={ADMIN_LOGIN} className="text-xl text-black rounded-md p-1 pl-2 pr-2 underline">
                                Admin Login
                            </Link>

                            <Link to={ADMIN_REGISTER} className="text-xl text-black rounded-md p-1 pl-2 pr-2 underline">
                                Admin Register
                            </Link>
                        </>
                    )}


                </div>
            </div>
        </div>
    );
}

export { AdminLoginHeader };
