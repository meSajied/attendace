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
import {UpdateProfile} from "./pages/UpdateProfile";
import {Logout} from "./account/Logout";
import {AddEmployee} from "./pages/AddEmployee";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
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
    ADMIN_SEND_CODE, ADMIN_USER_UPDATE, USER_CHECKIN,
    USER_DASHBOARD,
    USER_LOGIN,
    USER_LOGOUT, USER_PROFILE
} from "./routes";

function App() {
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
                  <Route path={ADMIN_DASHBOARD} element={<RequiredAuthenticationAdmin children={<WorkRecord />} />} />
                  <Route path={ADMIN_EMPLOYEE_LIST} element={<RequiredAuthenticationAdmin children={<Employee />} />} />
                  <Route path={USER_CHECKIN} element={<RequiredAuthenticationAdmin children={<CheckIn />} />} />
                  <Route path={ADMIN_USER_UPDATE} element={<RequiredAuthenticationAdmin children={<UpdateProfile />} />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
