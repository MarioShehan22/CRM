const { PrismaClient } = require('@prisma/client');
const { PrismaMysql } = require('@prisma/adapter-mysql');

const adapter = new PrismaMysql({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;