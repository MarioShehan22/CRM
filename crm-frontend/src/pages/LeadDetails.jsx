import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axiosInstance";

function LeadDetails() {
    const { id } = useParams();

    const [lead, setLead] = useState(null);
    const [noteContent, setNoteContent] = useState("");

    const fetchLead = async () => {
        const res = await api.get(`/leads/${id}`);
        setLead(res.data);
    };

    const addNote = async (e) => {
        e.preventDefault();

        if (!noteContent.trim()) return;

        await api.post(`/notes/lead/${id}`, {
            content: noteContent,
        });

        setNoteContent("");
        fetchLead();
    };

    useEffect(() => {
        fetchLead();
    }, [id]);

    if (!lead) {
        return <p className="text-slate-500">Loading lead...</p>;
    }

    return (
        <div>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{lead.leadName}</h1>
                    <p className="mt-1 text-slate-500">{lead.companyName}</p>
                </div>

                <Link
                    to={`/leads/edit/${lead.id}`}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
                >
                    Edit Lead
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-bold text-slate-900">
                            Lead Information
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Info label="Email" value={lead.email} />
                            <Info label="Phone" value={lead.phoneNumber} />
                            <Info label="Status" value={lead.status?.statusName} />
                            <Info label="Source" value={lead.leadSource?.sourceName} />
                            <Info label="Salesperson" value={lead.salesperson?.name} />
                            <Info label="Deal Value" value={`Rs. ${lead.estimatedDealValue}`} />
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold text-slate-900">Add Note</h2>

                        <form onSubmit={addNote}>
              <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write call update, follow-up, meeting note..."
                  className="h-32 w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

                            <button className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
                                Add Note
                            </button>
                        </form>
                    </div>
                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-bold text-slate-900">Notes</h2>

                    <div className="space-y-4">
                        {lead.notes?.length === 0 && (
                            <p className="text-sm text-slate-500">No notes yet.</p>
                        )}

                        {lead.notes?.map((note) => (
                            <div key={note.id} className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-700">{note.content}</p>
                                <p className="mt-3 text-xs text-slate-500">
                                    {note.user?.name || "Unknown"} •{" "}
                                    {new Date(note.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </p>
            <p className="mt-1 font-semibold text-slate-900">{value || "-"}</p>
        </div>
    );
}

export default LeadDetails;