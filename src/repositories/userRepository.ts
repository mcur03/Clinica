import { RowDataPacket } from "mysql2";
import db from "../config/db";
import bcrypt from 'bcrypt';

class UserRepository{
    static async registerUser(user:User, verificationCode:string): Promise<void>{
        const { gmail, documento, nombre, apellido, edad, celular, fechaNacimiento, password, rol } = user;
        const hashPass = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO user(gmail, documento, nombre, apellido, edad, celular, fechaNacimiento, password, rol, verification_code, is_verified ) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [gmail, documento, nombre, apellido, edad, celular, fechaNacimiento, hashPass, rol, verificationCode, false]);
            console.log(`Código de verificación para ${gmail}: ${verificationCode}`);
    }

    static async verifyemailAndCode(email:string, verificationCode:string):Promise<User | null>{
        console.log(`Buscando usuario con correo: ${email} y código de verificación: ${verificationCode}`);
        const [user] = await db.query<RowDataPacket[]>(
            'SELECT * FROM user WHERE LOWER(gmail) = LOWER(?) AND verification_code = ?',
            [email, verificationCode]
        );
        // Verifica si encontró un usuario
        if (user.length === 0) {
            console.log('No se encontró ningún usuario con el correo y código proporcionado.');
            return null; // No se encontró ningún usuario
        }
        console.log('Usuario encontrado:', user[0]);
        return user[0] as User;
    }

    static async updateEstateUser(email:string){
        await db.query('UPDATE user SET is_verified = ?, verification_code = NULL WHERE gmail = ?', [true, email]);
    }

    static async loginUser(documento: string, password: string): Promise<User | null> {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM user WHERE documento = ?', [documento]);
        if (rows.length > 0) {
            const user = rows[0] as User;
            // Verificar si el usuario está verificado
            if (!user.is_verified) {
                return null; // Retorna null si el usuario no está verificado
            }
            // Comparar la contraseña
            const match = await bcrypt.compare(password, user.password);
            return match ? user : null;
        }
        return null;
    }
    
}

export default UserRepository;