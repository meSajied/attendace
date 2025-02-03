import {useNavigate, useParams} from "react-router-dom";
import {axiosInstance} from "../axiosInstance";
import {useAuth} from "../account/Authentication";

function DeleteEmployee() {
    const {admin} = useAuth()
    const {id} = useParams();
    const navigate = useNavigate();
    const credentials = admin? btoa(`${admin.username}:${admin.password}`) : '';

    try {
        axiosInstance.delete(`/employee/${id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/admin/employee");
            }
        })
    }catch (e) {
        alert("Failed to delete employee");
    }
}

export default DeleteEmployee;