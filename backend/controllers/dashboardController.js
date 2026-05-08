const prisma = require("../utill/prisma");

const getDashboardStats = async (req, res) => {
    try {
        const totalLeads = await prisma.lead.count();

        const newLeads = await prisma.lead.count({
            where: { status: { statusName: "New" } },
        });

        const qualifiedLeads = await prisma.lead.count({
            where: { status: { statusName: "Qualified" } },
        });

        const wonLeads = await prisma.lead.count({
            where: { status: { statusName: "Won" } },
        });

        const lostLeads = await prisma.lead.count({
            where: { status: { statusName: "Lost" } },
        });

        const totalEstimated = await prisma.lead.aggregate({
            _sum: { estimatedDealValue: true },
        });

        const totalWon = await prisma.lead.aggregate({
            _sum: { estimatedDealValue: true },
            where: { status: { statusName: "Won" } },
        });

        return res.json({
            totalLeads,
            newLeads,
            qualifiedLeads,
            wonLeads,
            lostLeads,
            totalEstimatedDealValue: Number(totalEstimated._sum.estimatedDealValue || 0),
            totalWonDealValue: Number(totalWon._sum.estimatedDealValue || 0),
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching dashboard stats",
            error: error.message,
        });
    }
};

module.exports = { getDashboardStats };