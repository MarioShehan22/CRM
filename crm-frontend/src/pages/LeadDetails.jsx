import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

function LeadDetails() {
    const { id } = useParams();

    const [lead, setLead] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteContent, setNoteContent] = useState("");
    const [noteError, setNoteError] = useState("");
    const [loadingNote, setLoadingNote] = useState(false);

    const fetchLead = async () => {
        try {
            const res = await api.get(`/leads/${id}`);
            setLead(res.data);
        } catch {
            toast.error("Failed to load lead details");
        }
    };

    const fetchNotes = async () => {
        try {
            const res = await api.get(`/notes/lead/${id}`);
            setNotes(res.data);
        } catch {
            toast.error("Failed to load notes");
        }
    };

    useEffect(() => {
        fetchLead();
        fetchNotes();
    }, [id]);

    const validateNote = () => {
        if (!noteContent.trim()) {
            setNoteError("Note content is required");
            return false;
        }

        if (noteContent.trim().length < 5) {
            setNoteError("Note must be at least 5 characters");
            return false;
        }

        setNoteError("");
        return true;
    };

    const addNote = async (e) => {
        e.preventDefault();

        if (!validateNote()) {
            toast.error("Please enter a valid note");
            return;
        }

        try {
            setLoadingNote(true);

            await api.post(`/notes/lead/${id}`, {
                content: noteContent,
            });

            toast.success("Note added successfully");
            setNoteContent("");
            fetchNotes();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add note");
        } finally {
            setLoadingNote(false);
        }
    };

    const deleteNote = async (noteId) => {
        if (!window.confirm("Delete this note?")) return;

        try {
            await api.delete(`/notes/${noteId}`);
            toast.success("Note deleted successfully");
            fetchNotes();
        } catch {
            toast.error("Failed to delete note");
        }
    };

    if (!lead) {
        return <p className="text-slate-500">Loading lead details...</p>;
    }

    return (
        <div>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{lead.leadName}</h1>
                    <p className="mt-1 text-slate-500">
                        {lead.companyName || "No company"}
                    </p>
                </div>

                <Link
                    to={`/leads/edit/${lead.id}`}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
                >
                    Edit Lead
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-bold text-slate-900">
                            Lead Information
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Info label="Email" value={lead.email} />
                            <Info label="Phone" value={lead.phoneNumber} />
                            <Info label="Status" value={lead.status?.statusName} />
                            <Info label="Lead Source" value={lead.leadSource?.sourceName} />
                            <Info label="Salesperson" value={lead.salesperson?.name} />
                            <Info
                                label="Deal Value"
                                value={`Rs. ${lead.estimatedDealValue}`}
                            />
                            <Info
                                label="Created Date"
                                value={new Date(lead.createdAt).toLocaleString()}
                            />
                            <Info
                                label="Last Updated"
                                value={new Date(lead.updatedAt).toLocaleString()}
                            />
                        </div>
                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Add Lead Note</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Add call updates, follow-ups, meeting notes, or internal comments.
                        </p>

                        <form onSubmit={addNote} className="mt-5">
              <textarea
                  value={noteContent}
                  onChange={(e) => {
                      setNoteContent(e.target.value);
                      setNoteError("");
                  }}
                  placeholder="Example: Called customer and scheduled demo for Friday..."
                  className={`h-32 w-full rounded-2xl border p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                      noteError ? "border-red-400" : "border-slate-300"
                  }`}
              />

                            {noteError && (
                                <p className="mt-1 text-xs font-medium text-red-600">
                                    {noteError}
                                </p>
                            )}

                            <div className="mt-4 flex justify-end">
                                <button
                                    disabled={loadingNote}
                                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loadingNote ? "Adding..." : "Add Note"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">Lead Notes</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Note content, created by, and created date.
                    </p>

                    <div className="mt-5 space-y-4">
                        {notes.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                                No notes added yet.
                            </div>
                        )}

                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <p className="text-sm leading-relaxed text-slate-700">
                                    {note.content}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="text-xs text-slate-500">
                    <span className="rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-700">
                      {note.user?.name || "Unknown User"}
                    </span>

                                        <span className="ml-2">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                                    </div>

                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
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