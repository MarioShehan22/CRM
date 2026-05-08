const prisma = require("../utill/prisma");

const createLeadSource = async (req, res) => {
    try {
        const { sourceName } = req.body;

        if (!sourceName) {
            return res.status(400).json({ message: "Source name is required" });
        }

        const source = await prisma.leadSource.create({
            data: { sourceName },
        });

        return res.status(201).json({
            message: "Lead source created successfully",
            source,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating lead source",
            error: error.message,
        });
    }
};

const getAllLeadSources = async (req, res) => {
    try {
        const sources = await prisma.leadSource.findMany({
            orderBy: { sourceName: "asc" },
        });

        return res.json(sources);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching lead sources",
            error: error.message,
        });
    }
};

const updateLeadSource = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { sourceName } = req.body;

        if (!sourceName) {
            return res.status(400).json({ message: "Source name is required" });
        }

        const source = await prisma.leadSource.update({
            where: { id },
            data: { sourceName },
        });

        return res.json({
            message: "Lead source updated successfully",
            source,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating lead source",
            error: error.message,
        });
    }
};

const deleteLeadSource = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.leadSource.delete({
            where: { id },
        });

        return res.json({ message: "Lead source deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting lead source",
            error: error.message,
        });
    }
};

module.exports = {
    createLeadSource,
    getAllLeadSources,
    updateLeadSource,
    deleteLeadSource,
};