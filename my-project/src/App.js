import React, {useReducer, useEffect} from "react";
import './App.css';
import Login from "./account/Login";
import {AuthProvider} from "./account/Authentication";
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import {Dashboard} from "./account/Dashboard";
import {RequiredAuthentication} from "./account/RequiredAuthentication";
import {UserProfile} from "./pages/UserProfile";
import WorkRecord from "./pages/WorkRecord";
import Employee from "./pages/Employee";
import CheckIn from "./pages/CheckIn";
import {Logout} from "./account/Logout";
import {AddEmployee} from "./pages/AddEmployee";
import AdminRegister from "./pages/AdminRegister";
import SendCode from "./pages/SendCode";
import AdminLogin from "./pages/AdminLogin";
import {RequiredAuthenticationAdmin} from "./pages/RequiredAuthenticationAdmin";
import {AdminLogout} from "./pages/AdminLogout";
import DeleteEmployee from "./pages/DeleteEmployee";
import {
    ADMIN_ADD_EMPLOYEE, ADMIN_DASHBOARD, ADMIN_DELETE_EMPLOYEE, ADMIN_EMPLOYEE_LIST,
    ADMIN_LOGIN,
    ADMIN_LOGOUT,
    ADMIN_REGISTER,
    ADMIN_SEND_CODE, ADMIN_USER_UPDATE, EMPLOYEE_WORK_RECORD, USER_CHECKIN,
    USER_DASHBOARD,
    USER_LOGIN,
    USER_LOGOUT, USER_PROFILE
} from "./routes";
import axios from "axios";
import {Loading} from "./components/Loading";
import {UpdateProfile} from "./pages/UpdateProfile";

const ACTIONS = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

// Initial state
const initialState = {
    ip: null,
    loading: true,
    error: null,
};

// Reducer function
const ipReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.REQUEST:
            return { ...state, loading: true, error: null };
        case ACTIONS.SUCCESS:
            return { ...state, loading: false, ip: action.payload };
        case ACTIONS.FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(ipReducer, initialState);

    const allowedIp = '103.142.170.22';

    useEffect(() => {
        const fetchIp = async () => {
            dispatch({ type: ACTIONS.REQUEST });

            try {
                const response = await axios('https://api.ipify.org?format=json');
                dispatch({ type: ACTIONS.SUCCESS, payload: response.data.ip });
                console.log(response.data.ip);
            } catch (error) {
                dispatch({ type: ACTIONS.FAILURE, error: error.message });
            }
        };

        fetchIp();
    }, []);

    if (state.loading) {
        return <p><Loading /></p>;
    }

    if (state.error) {
        return <p>Error: {state.error}</p>;
    }

    if (state.ip !== allowedIp) {
        return <p>You are not authorized to access this content.</p>;
    }

  return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path={USER_LOGIN} element={<Login />} />
                  <Route path={USER_LOGOUT} element={<Logout />} />
                  <Route path={ADMIN_LOGOUT} element={<AdminLogout />} />
                  <Route path={ADMIN_REGISTER} element={<AdminRegister />} />
                  <Route path={ADMIN_SEND_CODE} element={<SendCode />} />
                  <Route path={ADMIN_LOGIN} element={<AdminLogin />} />
                  <Route path={USER_DASHBOARD} element={<RequiredAuthentication children={<Dashboard />} /> } />
                  <Route path={USER_PROFILE} element={<RequiredAuthentication children={<UserProfile />} /> } />
                  <Route path={ADMIN_ADD_EMPLOYEE} element={<RequiredAuthenticationAdmin children={<AddEmployee />} />} />
                  <Route path={ADMIN_DELETE_EMPLOYEE} element={<RequiredAuthenticationAdmin children={<DeleteEmployee />} />} />
                  <Route path={EMPLOYEE_WORK_RECORD} element={<WorkRecord />} />
                  <Route path={ADMIN_EMPLOYEE_LIST} element={<RequiredAuthenticationAdmin children={<Employee />} />} />
                  <Route path={USER_CHECKIN} element={<CheckIn />} />
                  <Route path={ADMIN_USER_UPDATE} element={<UpdateProfile />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
