import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

function LeadStatuses() {
    const [statuses, setStatuses] = useState([]);
    const [editId, setEditId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: { statusName: "", orderIndex: "" } });

    const fetchStatuses = async () => {
        try {
            const res = await api.get("/lead-statuses");
            setStatuses(res.data);
        } catch {
            toast.error("Failed to load lead statuses");
        }
    };

    useEffect(() => {
        fetchStatuses();
    }, []);

    const onSubmit = async (data) => {
        try {
            const payload = {
                statusName: data.statusName.trim(),
                orderIndex: Number(data.orderIndex),
            };

            if (editId) {
                await api.put(`/lead-statuses/${editId}`, payload);
                toast.success("Lead status updated successfully");
            } else {
                await api.post("/lead-statuses", payload);
                toast.success("Lead status created successfully");
            }

            reset({ statusName: "", orderIndex: "" });
            setEditId(null);
            fetchStatuses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save lead status");
        }
    };

    const handleEdit = (status) => {
        setEditId(status.id);
        reset({
            statusName: status.statusName,
            orderIndex: status.orderIndex,
        });
    };

    const handleCancel = () => {
        setEditId(null);
        reset({ statusName: "", orderIndex: "" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this status?")) return;

        try {
            await api.delete(`/lead-statuses/${id}`);
            toast.success("Lead status deleted successfully");
            fetchStatuses();
        } catch {
            toast.error("Failed to delete lead status");
        }
    };

    const inputClass = "w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Statuses</h1>
            <p className="mt-1 text-slate-500">Manage pipeline stages</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-3xl border bg-white p-5 shadow-sm">
                <div className="grid gap-3 md:grid-cols-4">
                    <div>
                        <input
                            {...register("statusName", {
                                required: "Status name is required",
                                minLength: {
                                    value: 2,
                                    message: "Status name must be at least 2 characters",
                                },
                            })}
                            placeholder="Example: New"
                            className={`${inputClass} ${errors.statusName ? "border-red-400" : "border-slate-300"}`}
                        />
                        {errors.statusName && (
                            <p className="mt-1 text-xs font-medium text-red-600">
                                {errors.statusName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="number"
                            {...register("orderIndex", {
                                required: "Order index is required",
                                min: {
                                    value: 1,
                                    message: "Order index must be greater than 0",
                                },
                            })}
                            placeholder="Order Index"
                            className={`${inputClass} ${errors.orderIndex ? "border-red-400" : "border-slate-300"}`}
                        />
                        {errors.orderIndex && (
                            <p className="mt-1 text-xs font-medium text-red-600">
                                {errors.orderIndex.message}
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
                        <th className="px-5 py-4">Order</th>
                        <th className="px-5 py-4">Status Name</th>
                        <th className="px-5 py-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {statuses.map((status) => (
                        <tr key={status.id}>
                            <td className="px-5 py-4">{status.orderIndex}</td>
                            <td className="px-5 py-4 font-semibold">{status.statusName}</td>
                            <td className="space-x-3 px-5 py-4">
                                <button onClick={() => handleEdit(status)} className="text-sm font-semibold text-amber-600">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(status.id)} className="text-sm font-semibold text-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {statuses.length === 0 && (
                        <tr>
                            <td colSpan="3" className="px-5 py-8 text-center text-slate-500">
                                No statuses found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeadStatuses;