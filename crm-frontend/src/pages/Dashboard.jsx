import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get("/dashboard/stats").then((res) => setStats(res.data));
    }, []);

    if (!stats) {
        return <p className="text-slate-500">Loading dashboard...</p>;
    }

    const cards = [
        ["Total Leads", stats.totalLeads],
        ["New Leads", stats.newLeads],
        ["Qualified Leads", stats.qualifiedLeads],
        ["Won Leads", stats.wonLeads],
        ["Lost Leads", stats.lostLeads],
        ["Estimated Value", `Rs. ${stats.totalEstimatedDealValue}`],
        ["Won Deal Value", `Rs. ${stats.totalWonDealValue}`],
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="mt-1 text-slate-500">
                    Overview of your sales pipeline performance
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(([title, value]) => (
                    <div
                        key={title}
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;