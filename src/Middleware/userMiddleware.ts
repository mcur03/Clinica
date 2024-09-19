import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { RowDataPacket } from "mysql2";
import jwt, { decode } from 'jsonwebtoken';

export const validaUserExiste = async(req:Request, res:Response, next:NextFunction) => {
    const { documento } = req.body;

    try{
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM user WHERE documento = ?', [documento])
        if(rows.length > 0){
            res.status(401).json({message: 'Este documento ya se encuestra regustrado'})
        }
        next();
    }catch(error){
        console.error('Database error', error);
        res.status(500).json({message: 'error en la base de datos', error})
        
    }
}

export const validateToken = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json('Acceso denegado')
    }
    try {
        jwt.verify(token as string, process.env.JWT_SECRET as string, (err, decoded:any) => {
            if (err) {
                console.error('Acceso de negado o token caducado');
                return res.status(401).json({message: 'Acceso de negado o token caducado'})
            } else {
                console.log('Autenticado');
                req.user = decoded;
                next();
            }
        })
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).json({message: 'error en el servidor', error})
    }
}

export function verifyRole(role: string){
    return(req:Request, res:Response, next:NextFunction) => {
        const user = req.user;

        if (!user || user.rol !== role){
            return res.status(403).json({ message: 'Acceso denegado. No tienes los permisos necesarios.' });
        }
        next();
    };
}