import {ADMIN_EMPLOYEE_LIST, ADMIN_LOGOUT, USER_DASHBOARD, USER_LOGOUT} from "../routes";
import {Link} from "react-router-dom";
import {Ztrios} from "./Ztrios";
import {useAuth} from "../account/Authentication";

function Header() {
    const { isAdminLoggedIn } = useAuth();
    return (
        <div className="flex justify-between p-3">
            <Link to={isAdminLoggedIn ? ADMIN_EMPLOYEE_LIST : USER_DASHBOARD} className="flex items-center space-x-3">
                <Ztrios />
            </Link>
            <div>
                {isAdminLoggedIn ? (
                    <div>
                        <Link to={ADMIN_LOGOUT} className="text-xl bg-black text-white rounded-md p-1 pl-2 pr-2">Logout</Link>
                    </div>
                ) : (
                    <div>
                        <Link to={USER_LOGOUT} className="text-xl bg-black text-white rounded-md p-1 pl-2 pr-2">Logout</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export {Header};
