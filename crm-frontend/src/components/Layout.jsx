import { Link, NavLink, useNavigate } from "react-router-dom";

function Layout({ children }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `block rounded-xl px-4 py-3 text-sm font-medium transition ${
            isActive
                ? "bg-blue-600 text-white shadow"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <div className="min-h-screen bg-slate-100">
            <aside className="fixed left-0 top-0 hidden h-full w-64 bg-slate-950 p-5 text-white lg:block">
                <Link to="/dashboard" className="mb-8 block">
                    <h1 className="text-2xl font-bold">CRM Pro</h1>
                    <p className="text-sm text-slate-400">Lead Management System</p>
                </Link>

                <nav className="space-y-2">
                    <NavLink to="/dashboard" className={linkClass}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/leads" className={linkClass}>
                        Leads
                    </NavLink>
                    <NavLink to="/leads/create" className={linkClass}>
                        Create Lead
                    </NavLink>
                </nav>

                <button
                    onClick={logout}
                    className="absolute bottom-5 left-5 right-5 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Logout
                </button>
            </aside>

            <main className="lg:ml-64">
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Sales CRM Dashboard
                        </h2>
                        <p className="text-xs text-slate-500">
                            Manage leads, notes, and pipeline progress
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 lg:hidden"
                    >
                        Logout
                    </button>
                </header>

                <section className="p-6">{children}</section>
            </main>
        </div>
    );
}

export default Layout;