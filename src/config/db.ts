import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

async function checkConnectio(){
    try {
        const connectio = await db.getConnection();
        console.log('Conectado a la base de datos');
        connectio.release; //liberar la conexión de vuelta al pool
    } catch (error) {
        console.error('Error al conecta a la nase de datos', error);
    }
}

checkConnectio();

export default db;