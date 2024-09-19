import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Función para enviar el correo de verificación
export const sendVerificationEmail = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verificación de correo electrónico',
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
    };
  
    await transporter.sendMail(mailOptions);
};