const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "ADMIN",
            isActive: true,
        },
    });

    const leadSources = ["Website", "LinkedIn", "Referral", "Cold Email", "Event"];

    for (const sourceName of leadSources) {
        await prisma.leadSource.upsert({
            where: { sourceName },
            update: {},
            create: { sourceName },
        });
    }

    const leadStatuses = [
        { statusName: "New", orderIndex: 1 },
        { statusName: "Contacted", orderIndex: 2 },
        { statusName: "Qualified", orderIndex: 3 },
        { statusName: "Proposal Sent", orderIndex: 4 },
        { statusName: "Won", orderIndex: 5 },
        { statusName: "Lost", orderIndex: 6 },
    ];

    for (const status of leadStatuses) {
        await prisma.leadStatus.upsert({
            where: { statusName: status.statusName },
            update: { orderIndex: status.orderIndex },
            create: status,
        });
    }

    const salespersons = [
        {
            name: "John Sales",
            email: "john@example.com",
            phoneNumber: "0771234567",
        },
        {
            name: "Mary Sales",
            email: "mary@example.com",
            phoneNumber: "0779876543",
        },
    ];

    for (const salesperson of salespersons) {
        await prisma.salesperson.upsert({
            where: { email: salesperson.email },
            update: {
                name: salesperson.name,
                phoneNumber: salesperson.phoneNumber,
            },
            create: salesperson,
        });
    }

    console.log("Seed completed successfully");
}

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });