const prisma = require("../utill/prisma");

const createSalesperson = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required",
            });
        }

        const salesperson = await prisma.salesperson.create({
            data: {
                name,
                email,
                phoneNumber,
            },
        });

        return res.status(201).json({
            message: "Salesperson created successfully",
            salesperson,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating salesperson",
            error: error.message,
        });
    }
};

const getAllSalespersons = async (req, res) => {
    try {
        const salespersons = await prisma.salesperson.findMany({
            orderBy: { name: "asc" },
        });

        return res.json(salespersons);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching salespersons",
            error: error.message,
        });
    }
};

const updateSalesperson = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, phoneNumber } = req.body;

        const salesperson = await prisma.salesperson.update({
            where: { id },
            data: {
                name,
                email,
                phoneNumber,
            },
        });

        return res.json({
            message: "Salesperson updated successfully",
            salesperson,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating salesperson",
            error: error.message,
        });
    }
};

const deleteSalesperson = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.salesperson.delete({
            where: { id },
        });

        return res.json({ message: "Salesperson deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting salesperson",
            error: error.message,
        });
    }
};

module.exports = {
    createSalesperson,
    getAllSalespersons,
    updateSalesperson,
    deleteSalesperson,
};