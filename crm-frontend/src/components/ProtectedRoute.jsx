import { Navigate } from "react-router-dom";
import Layout from "./Layout";

function ProtectedRoute({ children }) {
    const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));

    if (!tokenCookie) {
        return <Navigate to="/login" />;
    }

    return <Layout>{children}</Layout>;
}

export default ProtectedRoute;