import { Request, Response } from "express";
import PacienteRepository from "../repositories/pacienteRepository";

class PacienteController{
    static async create(req:Request, res:Response){
        const paciente:User = req.body;
        await PacienteRepository.createPaciente(paciente);
        return res.status(201).json({
            message: 'Paciente creado correctamente',
            paciente
        })
    }

    static async getPacientes(req:Request, res:Response){
        try {
            const paciente = await PacienteRepository.gatAllPaciente();
            return res.status(200).json({message: 'Pacientes', paciente})
        } catch(error) {
            console.error('error ', error);
            return res.status(500).json({message:'Erro al obtener los pacientes'});
        }
    }
}

export default PacienteController;