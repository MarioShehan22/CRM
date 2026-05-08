const prisma = require("../utill/prisma");

const createLeadStatus = async (req, res) => {
    try {
        const { statusName, orderIndex } = req.body;

        if (!statusName || !orderIndex) {
            return res.status(400).json({
                message: "Status name and order index are required",
            });
        }

        const status = await prisma.leadStatus.create({
            data: {
                statusName,
                orderIndex: Number(orderIndex),
            },
        });

        return res.status(201).json({
            message: "Lead status created successfully",
            status,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating lead status",
            error: error.message,
        });
    }
};

const getAllLeadStatuses = async (req, res) => {
    try {
        const statuses = await prisma.leadStatus.findMany({
            orderBy: { orderIndex: "asc" },
        });

        return res.json(statuses);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching lead statuses",
            error: error.message,
        });
    }
};

const updateLeadStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { statusName, orderIndex } = req.body;

        const status = await prisma.leadStatus.update({
            where: { id },
            data: {
                statusName,
                orderIndex: Number(orderIndex),
            },
        });

        return res.json({
            message: "Lead status updated successfully",
            status,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating lead status",
            error: error.message,
        });
    }
};

const deleteLeadStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.leadStatus.delete({
            where: { id },
        });

        return res.json({ message: "Lead status deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting lead status",
            error: error.message,
        });
    }
};

module.exports = {
    createLeadStatus,
    getAllLeadStatuses,
    updateLeadStatus,
    deleteLeadStatus,
};