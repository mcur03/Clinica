import dotenv from 'dotenv';

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Conectado al puerto: ', PORT);
}).on('error', (err:any)=>{
    throw new Error(err.message);
})