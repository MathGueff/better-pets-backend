import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export default async function connect() {
  const uri = process.env.MONGODB_URI || ''
  await mongoose
    .connect(uri)
    .then(() => {
      console.log('Conectado ao Banco')
    })
    .catch((err) => {
      console.error('Erro de conexão:', err)
    })
}
