import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

function Salespersons() {
    const [salespersons, setSalespersons] = useState([]);
    const [editId, setEditId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
        },
    });

    const fetchSalespersons = async () => {
        try {
            const res = await api.get("/salespersons");
            setSalespersons(res.data);
        } catch {
            toast.error("Failed to load salespersons");
        }
    };

    useEffect(() => {
        fetchSalespersons();
    }, []);

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name.trim(),
                email: data.email.trim(),
                phoneNumber: data.phoneNumber?.trim() || "",
            };

            if (editId) {
                await api.put(`/salespersons/${editId}`, payload);
                toast.success("Salesperson updated successfully");
            } else {
                await api.post("/salespersons", payload);
                toast.success("Salesperson created successfully");
            }

            reset({
                name: "",
                email: "",
                phoneNumber: "",
            });

            setEditId(null);
            fetchSalespersons();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save salesperson");
        }
    };

    const handleEdit = (person) => {
        setEditId(person.id);

        reset({
            name: person.name || "",
            email: person.email || "",
            phoneNumber: person.phoneNumber || "",
        });
    };

    const handleCancel = () => {
        setEditId(null);

        reset({
            name: "",
            email: "",
            phoneNumber: "",
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this salesperson?")) return;

        try {
            await api.delete(`/salespersons/${id}`);
            toast.success("Salesperson deleted successfully");
            fetchSalespersons();
        } catch {
            toast.error("Failed to delete salesperson");
        }
    };

    const inputClass =
        "w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

    const fieldClass = (field) =>
        `${inputClass} ${errors[field] ? "border-red-400" : "border-slate-300"}`;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Salespersons</h1>
            <p className="mt-1 text-slate-500">Manage sales team members</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 rounded-3xl border bg-white p-5 shadow-sm"
            >
                <div className="grid gap-3 md:grid-cols-4">
                    <div>
                        <input
                            placeholder="Name *"
                            className={fieldClass("name")}
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                },
                            })}
                        />

                        {errors.name && (
                            <p className="mt-1 text-xs font-medium text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email *"
                            className={fieldClass("email")}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="mt-1 text-xs font-medium text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            placeholder="Phone Number"
                            className={fieldClass("phoneNumber")}
                            {...register("phoneNumber", {
                                minLength: {
                                    value: 9,
                                    message: "Phone number must be at least 9 digits",
                                },
                                pattern: {
                                    value: /^[0-9+\-\s]*$/,
                                    message: "Phone number can only contain numbers",
                                },
                            })}
                        />

                        {errors.phoneNumber && (
                            <p className="mt-1 text-xs font-medium text-red-600">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    <button className="h-12 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700">
                        {editId ? "Update" : "Add"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="h-12 rounded-xl border border-slate-300 px-5 font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-slate-50 text-left text-sm text-slate-500">
                    <tr>
                        <th className="px-5 py-4">Name</th>
                        <th className="px-5 py-4">Email</th>
                        <th className="px-5 py-4">Phone</th>
                        <th className="px-5 py-4">Actions</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                    {salespersons.map((person) => (
                        <tr key={person.id}>
                            <td className="px-5 py-4 font-semibold">{person.name}</td>
                            <td className="px-5 py-4">{person.email}</td>
                            <td className="px-5 py-4">{person.phoneNumber || "-"}</td>
                            <td className="space-x-3 px-5 py-4">
                                <button
                                    onClick={() => handleEdit(person)}
                                    className="text-sm font-semibold text-amber-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(person.id)}
                                    className="text-sm font-semibold text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {salespersons.length === 0 && (
                        <tr>
                            <td colSpan="4" className="px-5 py-8 text-center text-slate-500">
                                No salespersons found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Salespersons;