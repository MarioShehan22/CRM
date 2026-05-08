import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

function LeadSources() {
    const [sources, setSources] = useState([]);
    const [editId, setEditId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: { sourceName: "" } });

    const fetchSources = async () => {
        try {
            const res = await api.get("/lead-sources");
            setSources(res.data);
        } catch {
            toast.error("Failed to load lead sources");
        }
    };

    useEffect(() => {
        fetchSources();
    }, []);

    const onSubmit = async (data) => {
        try {
            const payload = { sourceName: data.sourceName.trim() };

            if (editId) {
                await api.put(`/lead-sources/${editId}`, payload);
                toast.success("Lead source updated successfully");
            } else {
                await api.post("/lead-sources", payload);
                toast.success("Lead source created successfully");
            }

            reset({ sourceName: "" });
            setEditId(null);
            fetchSources();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save lead source");
        }
    };

    const handleEdit = (source) => {
        setEditId(source.id);
        reset({ sourceName: source.sourceName });
    };

    const handleCancel = () => {
        setEditId(null);
        reset({ sourceName: "" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this lead source?")) return;

        try {
            await api.delete(`/lead-sources/${id}`);
            toast.success("Lead source deleted successfully");
            fetchSources();
        } catch {
            toast.error("Failed to delete lead source");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Sources</h1>
            <p className="mt-1 text-slate-500">Manage where leads come from</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-3xl border bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            {...register("sourceName", {
                                required: "Lead source name is required",
                                minLength: {
                                    value: 2,
                                    message: "Lead source must be at least 2 characters",
                                },
                            })}
                            placeholder="Example: Website, LinkedIn"
                            className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                                errors.sourceName ? "border-red-400" : "border-slate-300"
                            }`}
                        />
                        {errors.sourceName && (
                            <p className="mt-1 text-xs font-medium text-red-600">
                                {errors.sourceName.message}
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
                        <th className="px-5 py-4">ID</th>
                        <th className="px-5 py-4">Source Name</th>
                        <th className="px-5 py-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {sources.map((source) => (
                        <tr key={source.id}>
                            <td className="px-5 py-4">{source.id}</td>
                            <td className="px-5 py-4 font-semibold">{source.sourceName}</td>
                            <td className="space-x-3 px-5 py-4">
                                <button onClick={() => handleEdit(source)} className="text-sm font-semibold text-amber-600">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(source.id)} className="text-sm font-semibold text-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {sources.length === 0 && (
                        <tr>
                            <td colSpan="3" className="px-5 py-8 text-center text-slate-500">
                                No lead sources found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeadSources;