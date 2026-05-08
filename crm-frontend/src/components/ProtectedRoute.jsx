import { Navigate } from "react-router-dom";
import Layout from "./Layout";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Layout>{children}</Layout>;
}

export default ProtectedRoute;