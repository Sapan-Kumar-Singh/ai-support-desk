import { sequelize, connectPostgresDB } from "./prisma/connection.js";


const initializeDatabase = async () => {
    await connectPostgresDB();

    if (process.env.NODE_ENV === "development") {
        await sequelize.sync();
        console.log("Database tables synchronized");
    }
};

export default initializeDatabase;