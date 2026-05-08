import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

function LeadForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [statuses, setStatuses] = useState([]);
    const [sources, setSources] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            leadName: "",
            companyName: "",
            email: "",
            phoneNumber: "",
            leadSourceId: "",
            salespersonId: "",
            statusId: "",
            estimatedDealValue: "",
        },
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statusRes, sourceRes, salespersonRes] = await Promise.all([
                    api.get("/lead-statuses"),
                    api.get("/lead-sources"),
                    api.get("/salespersons"),
                ]);

                setStatuses(statusRes.data);
                setSources(sourceRes.data);
                setSalespersons(salespersonRes.data);

                if (isEdit) {
                    const leadRes = await api.get(`/leads/${id}`);

                    reset({
                        leadName: leadRes.data.leadName || "",
                        companyName: leadRes.data.companyName || "",
                        email: leadRes.data.email || "",
                        phoneNumber: leadRes.data.phoneNumber || "",
                        leadSourceId: leadRes.data.leadSourceId || "",
                        salespersonId: leadRes.data.salespersonId || "",
                        statusId: leadRes.data.statusId || "",
                        estimatedDealValue: leadRes.data.estimatedDealValue || "",
                    });
                }
            } catch {
                toast.error("Failed to load form data");
            }
        };

        loadData();
    }, [id, isEdit, reset]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const payload = {
                ...data,
                leadSourceId: data.leadSourceId ? Number(data.leadSourceId) : null,
                salespersonId: data.salespersonId ? Number(data.salespersonId) : null,
                statusId: data.statusId ? Number(data.statusId) : null,
                estimatedDealValue: data.estimatedDealValue
                    ? Number(data.estimatedDealValue)
                    : 0,
            };

            if (isEdit) {
                await api.put(`/leads/${id}`, payload);
                toast.success("Lead updated successfully");
            } else {
                await api.post("/leads", payload);
                toast.success("Lead created successfully");
            }

            navigate("/leads");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save lead");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

    const fieldClass = (field) =>
        `${inputClass} ${errors[field] ? "border-red-400" : "border-slate-300"}`;

    const ErrorText = ({ field }) =>
        errors[field] ? (
            <p className="mt-1 text-xs font-medium text-red-600">
                {errors[field]?.message}
            </p>
        ) : null;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">
                    {isEdit ? "Edit Lead" : "Create Lead"}
                </h1>
                <p className="mt-1 text-slate-500">
                    Fill customer and sales pipeline information
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border bg-white p-6 shadow-sm"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <input
                            className={fieldClass("leadName")}
                            placeholder="Lead Name *"
                            {...register("leadName", {
                                required: "Lead name is required",
                                minLength: {
                                    value: 2,
                                    message: "Lead name must be at least 2 characters",
                                },
                            })}
                        />
                        <ErrorText field="leadName" />
                    </div>

                    <div>
                        <input
                            className={fieldClass("companyName")}
                            placeholder="Company Name"
                            {...register("companyName")}
                        />
                    </div>

                    <div>
                        <input
                            className={fieldClass("email")}
                            placeholder="Email"
                            type="email"
                            {...register("email", {
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        <ErrorText field="email" />
                    </div>

                    <div>
                        <input
                            className={fieldClass("phoneNumber")}
                            placeholder="Phone Number"
                            {...register("phoneNumber", {
                                minLength: {
                                    value: 9,
                                    message: "Phone number must be at least 9 digits",
                                },
                            })}
                        />
                        <ErrorText field="phoneNumber" />
                    </div>

                    <div>
                        <select
                            className={fieldClass("leadSourceId")}
                            {...register("leadSourceId", {
                                required: "Lead source is required",
                            })}
                        >
                            <option value="">Select Lead Source *</option>
                            {sources.map((source) => (
                                <option key={source.id} value={source.id}>
                                    {source.sourceName}
                                </option>
                            ))}
                        </select>
                        <ErrorText field="leadSourceId" />
                    </div>

                    <div>
                        <select
                            className={fieldClass("salespersonId")}
                            {...register("salespersonId", {
                                required: "Salesperson is required",
                            })}
                        >
                            <option value="">Select Salesperson *</option>
                            {salespersons.map((person) => (
                                <option key={person.id} value={person.id}>
                                    {person.name}
                                </option>
                            ))}
                        </select>
                        <ErrorText field="salespersonId" />
                    </div>

                    <div>
                        <select
                            className={fieldClass("statusId")}
                            {...register("statusId", {
                                required: "Status is required",
                            })}
                        >
                            <option value="">Select Status *</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.statusName}
                                </option>
                            ))}
                        </select>
                        <ErrorText field="statusId" />
                    </div>

                    <div>
                        <input
                            className={fieldClass("estimatedDealValue")}
                            type="number"
                            placeholder="Estimated Deal Value"
                            {...register("estimatedDealValue", {
                                min: {
                                    value: 0,
                                    message: "Deal value cannot be negative",
                                },
                            })}
                        />
                        <ErrorText field="estimatedDealValue" />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/leads")}
                        className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : isEdit ? "Update Lead" : "Create Lead"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LeadForm;