import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";

function LeadForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [statuses, setStatuses] = useState([]);
    const [sources, setSources] = useState([]);
    const [salespersons, setSalespersons] = useState([]);

    const [form, setForm] = useState({
        leadName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        leadSourceId: "",
        salespersonId: "",
        statusId: "",
        estimatedDealValue: "",
    });

    useEffect(() => {
        const loadData = async () => {
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
                setForm({
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
        };

        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEdit) {
            await api.put(`/leads/${id}`, form);
        } else {
            await api.post("/leads", form);
        }

        navigate("/leads");
    };

    const inputClass =
        "rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">
                    {isEdit ? "Edit Lead" : "Create Lead"}
                </h1>
                <p className="mt-1 text-slate-500">
                    Fill customer and pipeline information
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl border bg-white p-6 shadow-sm"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <input
                        className={inputClass}
                        name="leadName"
                        placeholder="Lead Name"
                        value={form.leadName}
                        onChange={(e) => setForm({ ...form, leadName: e.target.value })}
                        required
                    />

                    <input
                        className={inputClass}
                        name="companyName"
                        placeholder="Company Name"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    />

                    <input
                        className={inputClass}
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        className={inputClass}
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    />

                    <select
                        className={inputClass}
                        value={form.leadSourceId}
                        onChange={(e) => setForm({ ...form, leadSourceId: e.target.value })}
                    >
                        <option value="">Select Lead Source</option>
                        {sources.map((source) => (
                            <option key={source.id} value={source.id}>
                                {source.sourceName}
                            </option>
                        ))}
                    </select>

                    <select
                        className={inputClass}
                        value={form.salespersonId}
                        onChange={(e) =>
                            setForm({ ...form, salespersonId: e.target.value })
                        }
                    >
                        <option value="">Select Salesperson</option>
                        {salespersons.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={inputClass}
                        value={form.statusId}
                        onChange={(e) => setForm({ ...form, statusId: e.target.value })}
                    >
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.statusName}
                            </option>
                        ))}
                    </select>

                    <input
                        className={inputClass}
                        type="number"
                        placeholder="Estimated Deal Value"
                        value={form.estimatedDealValue}
                        onChange={(e) =>
                            setForm({ ...form, estimatedDealValue: e.target.value })
                        }
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/leads")}
                        className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
                        {isEdit ? "Update Lead" : "Create Lead"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LeadForm;