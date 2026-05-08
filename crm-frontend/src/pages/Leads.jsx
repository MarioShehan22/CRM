import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

function Leads() {
    const [leads, setLeads] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [sources, setSources] = useState([]);
    const [salespersons, setSalespersons] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        statusId: "",
        leadSourceId: "",
        salespersonId: "",
    });

    const fetchLookups = async () => {
        const [statusRes, sourceRes, salespersonRes] = await Promise.all([
            api.get("/lead-statuses"),
            api.get("/lead-sources"),
            api.get("/salespersons"),
        ]);

        setStatuses(statusRes.data);
        setSources(sourceRes.data);
        setSalespersons(salespersonRes.data);
    };

    const fetchLeads = async () => {
        const res = await api.get("/leads", { params: filters });
        setLeads(res.data);
    };

    const deleteLead = async (id) => {
        if (!window.confirm("Delete this lead?")) return;
        await api.delete(`/leads/${id}`);
        fetchLeads();
    };

    useEffect(() => {
        fetchLookups();
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [filters]);

    return (
        <div>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
                    <p className="mt-1 text-slate-500">
                        Manage your sales opportunities and customers
                    </p>
                </div>

                <Link
                    to="/leads/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
                >
                    + Create Lead
                </Link>
            </div>

            <div className="mb-6 grid gap-4 rounded-3xl border bg-white p-5 shadow-sm md:grid-cols-4">
                <input
                    placeholder="Search leads..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <select
                    value={filters.statusId}
                    onChange={(e) => setFilters({ ...filters, statusId: e.target.value })}
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="">All Statuses</option>
                    {statuses.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.statusName}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.leadSourceId}
                    onChange={(e) =>
                        setFilters({ ...filters, leadSourceId: e.target.value })
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="">All Sources</option>
                    {sources.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.sourceName}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.salespersonId}
                    onChange={(e) =>
                        setFilters({ ...filters, salespersonId: e.target.value })
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="">All Salespersons</option>
                    {salespersons.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-50 text-left text-sm text-slate-500">
                    <tr>
                        <th className="px-5 py-4">Lead</th>
                        <th className="px-5 py-4">Company</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Source</th>
                        <th className="px-5 py-4">Salesperson</th>
                        <th className="px-5 py-4">Value</th>
                        <th className="px-5 py-4">Actions</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                    {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="px-5 py-4 font-semibold text-slate-900">
                                {lead.leadName}
                                <p className="text-xs font-normal text-slate-500">
                                    {lead.email}
                                </p>
                            </td>
                            <td className="px-5 py-4">{lead.companyName || "-"}</td>
                            <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {lead.status?.statusName || "No Status"}
                  </span>
                            </td>
                            <td className="px-5 py-4">{lead.leadSource?.sourceName || "-"}</td>
                            <td className="px-5 py-4">{lead.salesperson?.name || "-"}</td>
                            <td className="px-5 py-4 font-semibold">
                                Rs. {lead.estimatedDealValue}
                            </td>
                            <td className="space-x-2 px-5 py-4">
                                <Link
                                    to={`/leads/${lead.id}`}
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/leads/edit/${lead.id}`}
                                    className="text-sm font-medium text-amber-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteLead(lead.id)}
                                    className="text-sm font-medium text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {leads.length === 0 && (
                        <tr>
                            <td colSpan="7" className="px-5 py-10 text-center text-slate-500">
                                No leads found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leads;