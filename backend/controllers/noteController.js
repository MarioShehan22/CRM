const prisma = require("../utill/prisma");

const addNote = async (req, res) => {
    try {
        const leadId = Number(req.params.leadId);
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Note content is required" });
        }

        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
        });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        const note = await prisma.leadNote.create({
            data: {
                leadId,
                content,
                createdBy: req.user.id,
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
        });

        return res.status(201).json({
            message: "Note added successfully",
            note,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error adding note",
            error: error.message,
        });
    }
};

const getNotesByLead = async (req, res) => {
    try {
        const leadId = Number(req.params.leadId);

        const notes = await prisma.leadNote.findMany({
            where: { leadId },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return res.json(notes);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching notes",
            error: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.leadNote.delete({
            where: { id },
        });

        return res.json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting note",
            error: error.message,
        });
    }
};

module.exports = {
    addNote,
    getNotesByLead,
    deleteNote,
};