import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        dialect: "postgres",
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }

)

const connectPostgresDB = async () => {
    await sequelize.authenticate();
    console.log(`PostgreSQL connected successfully port:${process.env.PGPORT}`);
}

export {
    sequelize,
    connectPostgresDB
}