import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg; // Import Pool from pg


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'FUMS'

})
export default pool;