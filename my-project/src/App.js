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

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/admin/register" element={<AdminRegister />} />
                  <Route path="/admin/dashboard" element={<RequiredAuthenticationAdmin children={<AdminDashboard />} />} />
                  <Route path="/admin/code" element={<SendCode />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/" element={<RequiredAuthentication children={<Dashboard />} /> } />
                  <Route path="/profile" element={<RequiredAuthentication children={<UserProfile />} /> } />
                  <Route path="/employee/add" element={<RequiredAuthenticationAdmin children={<AddEmployee />} />} />
                  <Route path="/work-record" element={<RequiredAuthenticationAdmin children={<WorkRecord />} />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/check-in/:id" element={<RequiredAuthenticationAdmin children={<CheckIn />} />} />
                  <Route path="/update/:id" element={<UpdateProfile />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
