import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "admin@example.com",
        password: "password123",
    });

    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
                        C
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">CRM Pro</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to manage your sales leads
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg hover:bg-blue-700">
                        Login
                    </button>
                </form>

                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p>Email: admin@example.com</p>
                    <p>Password: password123</p>
                </div>
            </div>
        </div>
    );
}

export default Login;