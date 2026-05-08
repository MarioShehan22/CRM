const prisma = require("../utill/prisma");

const createLead = async (req, res) => {
    try {
        const {
            leadName,
            companyName,
            email,
            phoneNumber,
            leadSourceId,
            salespersonId,
            statusId,
            estimatedDealValue,
        } = req.body;

        if (!leadName) {
            return res.status(400).json({ message: "Lead name is required" });
        }

        const lead = await prisma.lead.create({
            data: {
                leadName,
                companyName,
                email,
                phoneNumber,
                leadSourceId: leadSourceId ? Number(leadSourceId) : null,
                salespersonId: salespersonId ? Number(salespersonId) : null,
                statusId: statusId ? Number(statusId) : null,
                estimatedDealValue: estimatedDealValue ? Number(estimatedDealValue) : 0,
                createdBy: req.user.id,
            },
            include: {
                leadSource: true,
                salesperson: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating lead",
            error: error.message,
        });
    }
};

const getAllLeads = async (req, res) => {
    try {
        const { statusId, leadSourceId, salespersonId, search } = req.query;

        const where = {};

        if (statusId) where.statusId = Number(statusId);
        if (leadSourceId) where.leadSourceId = Number(leadSourceId);
        if (salespersonId) where.salespersonId = Number(salespersonId);

        if (search) {
            where.OR = [
                { leadName: { contains: search } },
                { companyName: { contains: search } },
                { email: { contains: search } },
            ];
        }

        const leads = await prisma.lead.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                leadSource: true,
                salesperson: true,
                status: true,
                _count: {
                    select: {
                        notes: true,
                    },
                },
            },
        });

        return res.json(leads);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching leads",
            error: error.message,
        });
    }
};

const getLeadById = async (req, res) => {
    try {
        const leadId = Number(req.params.id);

        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
            include: {
                leadSource: true,
                salesperson: true,
                status: true,
                notes: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        return res.json(lead);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching lead",
            error: error.message,
        });
    }
};

const updateLead = async (req, res) => {
    try {
        const leadId = Number(req.params.id);

        const {
            leadName,
            companyName,
            email,
            phoneNumber,
            leadSourceId,
            salespersonId,
            statusId,
            estimatedDealValue,
        } = req.body;

        const existingLead = await prisma.lead.findUnique({
            where: { id: leadId },
        });

        if (!existingLead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        const lead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                leadName,
                companyName,
                email,
                phoneNumber,
                leadSourceId: leadSourceId ? Number(leadSourceId) : null,
                salespersonId: salespersonId ? Number(salespersonId) : null,
                statusId: statusId ? Number(statusId) : null,
                estimatedDealValue: estimatedDealValue ? Number(estimatedDealValue) : 0,
            },
            include: {
                leadSource: true,
                salesperson: true,
                status: true,
            },
        });

        return res.json({
            message: "Lead updated successfully",
            lead,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating lead",
            error: error.message,
        });
    }
};

const updateLeadStatus = async (req, res) => {
    try {
        const leadId = Number(req.params.id);
        const { statusId } = req.body;

        if (!statusId) {
            return res.status(400).json({ message: "Status ID is required" });
        }

        const existingLead = await prisma.lead.findUnique({
            where: { id: leadId },
        });

        if (!existingLead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        const lead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                statusId: Number(statusId),
            },
            include: {
                status: true,
            },
        });

        return res.json({
            message: "Lead status updated successfully",
            lead,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating lead status",
            error: error.message,
        });
    }
};

const deleteLead = async (req, res) => {
    try {
        const leadId = Number(req.params.id);

        const existingLead = await prisma.lead.findUnique({
            where: { id: leadId },
        });

        if (!existingLead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        await prisma.lead.delete({
            where: { id: leadId },
        });

        return res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting lead",
            error: error.message,
        });
    }
};

module.exports = {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    updateLeadStatus,
    deleteLead,
};