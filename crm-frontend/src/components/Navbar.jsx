import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!token) return null;

    return (
        <nav className="navbar">
            <h2>CRM System</h2>

            <div>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/leads">Leads</Link>
                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;