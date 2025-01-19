import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cookie = getCookie();
        let cookieAdmin = getAdminCookie();
        cookie? setUser(JSON.parse(cookie)): setUser({});
        cookieAdmin? setAdmin(JSON.parse(cookieAdmin)): setAdmin({});
        setLoading(false);
    }, []);

    const isLoggedIn = !!(user?.username);
    const isAdminLoggedIn = !!(admin?.id);

    function login(user) {
        setUser(user);
        setCookies(user);
        return;
    }

    function loginAdmin(admin) {
            setAdmin(admin);
            setAdminCookies(admin);
            return;
        }

    function logout() {
        setUser({});
        Cookies.remove('user');
    }

    function logoutAdmin() {
        setAdmin({});
        Cookies.remove('admin');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <AuthContext.Provider value={{user, admin, login, loginAdmin, isLoggedIn, isAdminLoggedIn, logout, logoutAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

function getCookie() {
    return Cookies.get('user');
}

function getAdminCookie() {
    return Cookies.get('admin');
}

function setCookies(user) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);
    Cookies.set('user', JSON.stringify(user), { expires: expirationDate });
    return;
}

function setAdminCookies(admin) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);
    Cookies.set('admin', JSON.stringify(admin), { expires: expirationDate });
    return;
}