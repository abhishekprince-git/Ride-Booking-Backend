require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected:",result.rows[0]);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("database connection failed:",error);
    }
};
console.log("Password type:", typeof process.env.DB_PASSWORD);
startServer();