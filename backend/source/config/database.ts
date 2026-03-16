import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export default async function connect() {
  const uri = process.env.MONGODB_URI || ''
  if (!uri) {
    throw new Error(
      'Não foi possível identificar uma URI válida, preencha corretamente'
    )
  }
  console.log('🔌 Iniciando conexão com o banco de dados...')
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    console.log('✅ Conectado ao MongoDB com sucesso')
  } catch (error) {
    console.error('Erro ao conectar', error)
    process.exit(1)
  }
}
