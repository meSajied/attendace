import {useNavigate, useParams} from "react-router-dom";
import {axiosInstance} from "../axiosInstance";

function DeleteEmployee() {
    const {id} = useParams();
    const navigate = useNavigate();

    try {
        axiosInstance.delete(`/employee/${id}`)
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