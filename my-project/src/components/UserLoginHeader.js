import {Link} from "react-router-dom";
import {ADMIN_LOGIN} from "../routes";
import {Ztrios} from "./Ztrios";

function UserLoginHeader() {
    return (
        <div className="flex justify-between p-3 font-nunito">
            <Ztrios />
            <div>
                <div>
                    <Link to={ADMIN_LOGIN}
                          className="text-xl text-black rounded-md p-1 pl-2 pr-2 underline">Admin Login</Link>
                </div>
            </div>
        </div>
    );
}

export {UserLoginHeader};