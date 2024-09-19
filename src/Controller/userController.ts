import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import UserRepository from "../repositories/userRepository";
import { sendVerificationEmail } from "../email/emailConfig";

dotenv.config();

class UserController{
    static async register(req:Request, res:Response){
        try {
            const user:User = req.body;
            
            // Generar el codigo de verificación
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // codigo de 6 digitos

            await UserRepository.registerUser(user, verificationCode); 
            try {
                await sendVerificationEmail(user.gmail, verificationCode);

                return res.status(300).json({
                    message: 'Por favor ingresa el codigo de verificación que hemos enviado al correo'
                })
            } catch (error) {
                console.error('error al enviar el correo', error);
                return res.status(400).json('error al envair el correo')
            }
            
        } catch (error) {
            console.error('Error al crear el usuario', error);
            return res.status(500).json({message: 'Error al crear el usuario'})
        }
    }

    // Verificar el código de verificación
    static async verifyEmail (req: Request, res: Response) {
    const { gmail, verificationCode } = req.body;

    try {
        // Buscar al usuario por correo y código de verificación
        const user = await UserRepository.verifyemailAndCode(gmail, verificationCode,);
        console.log('Usuario encontrado: ', user);
        if (!user) {
            console.error('Error en la base de datos');
            return res.status(400).json({ message: 'Código de verificación incorrecto o usuario no encontrado' });
        }
    
        // Actualizar el estado de verificación del usuario
        await UserRepository.updateEstateUser(gmail);
    
    
        res.status(200).json({ message: 'Correo verificado exitosamente. Ya estas registrado.' });
    } catch (error) {
        console.error('Error al verificar el correo:',error);
        res.status(500).json({ message: 'Error al verificar el correo' });
    }
    };

    static async login(req: Request, res: Response) {
        try {
            const { documento, password } = req.body;
            const user = await UserRepository.loginUser(documento, password);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas o correo no verificado' });
            }
    
            // Generar el token JWT
            const token = jwt.sign({ fecha: user.fechaNacimiento, rol: user.rol }, 
                process.env.JWT_SECRET as string, 
                { expiresIn: process.env.JWT_EXPIRES });
            
            return res.status(200).json({
                message: 'Perfil',
                user,
                token
            });
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            return res.status(500).json({ message: 'Error en el sistema' });
        }
    }
    
    // static async login(req:Request, res:Response){
        // try {
            // const { documento, password } = req.body;
            // const user = await UserRepository.loginUser(documento, password);
            // if(!user){
                // return res.status(401).json({message: 'Credenciales invalidad'})
            // }
            // 
            // const token = jwt.sign({fecha: user.fechaNacimiento,  rol:user.rol}, 
                // process.env.JWT_SECRET as string, 
                // { expiresIn: process.env.JWT_EXPIRES})
            // return res.status(200).json({
                // message: 'Perfil',
                // user,
                // token
            // })
        // } catch (error) {
            // console.error('Error al logiarse',error);
            // return res.status(500).json({message: 'Error en el sistema'})
        // }
    // }
}

export default UserController;