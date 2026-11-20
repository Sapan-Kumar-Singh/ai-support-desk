import 'dotenv/config';
import http from 'http';
import app from './app.js';
import initializeDatabase from './database/initializeDatabase.js';
const REQUIRED_ENV = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "PGUSER", "PGPASSWORD", "PGHOST", "PGPORT", "PGDATABASE"];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
}

const PORT = process.env.PORT || 3000;


const start = async () => {
    await initializeDatabase();
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`servis running on port ${PORT}`);
    })
}

start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});