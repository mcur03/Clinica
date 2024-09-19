import { RowDataPacket } from "mysql2";
import db from "../config/db";
import bcrypt from 'bcrypt';

class PacienteRepository{
    static async createPaciente(paciente:User):Promise <void>{
        const { documento, nombre, apellido, edad, celular, fechaNacimiento, password, rol } = paciente;
        const hashPass = await bcrypt.hash(password, 10); 
        await db.query('INSERT INTO user(documento, nombre, apellido, edad, celular, fechaNacimiento, password, rol) VALUES(?,?,?,?,?,?,?,?)',
            [documento, nombre, apellido, edad, celular, fechaNacimiento, hashPass, rol]);
    }

    static async gatAllPaciente(): Promise<User[] | null>{
        try {
            const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM user WHERE rol = "paciente"');
            return rows as User[];
        } catch (error) {
            console.error('Error en la consulta getAllPaciente', error);
            return null;
        }
    }

    static async getPacienteByDocumnet(documento: string): Promise<User[] | null>{
        const [ row ] = await db.query<RowDataPacket[]>('SELECT * FROM user WHERE documento = ?', [documento]);
        
        if(!row){
            return null;
        }
        return row as User[];
    }
}

export default PacienteRepository;