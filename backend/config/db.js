// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Ozstore2025@',
  database: process.env.DB_NAME || 'ozstore',
  waitForConnections: true,
  connectionLimit: 100,
});

export default pool;




