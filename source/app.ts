import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { doSomethingMiddleware } from './middlewares/doSomethingMiddleware'
import { farmLog } from './uteis/farmLog'
import morgan from 'morgan'
import { errorMiddleware } from './middlewares/errorMiddleware'
import animalsRouter from './routers/animalsRouter'
import healthRouter from './routers/healthRouter'
import { database } from './config/database'

dotenv.config({ quiet: true })

const app = express()
const port = process.env.PORT || 3000

/* MIDDLEWARES */
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(doSomethingMiddleware)

/* ROTAS */
app.use(healthRouter.router)
app.use(animalsRouter.router)

/* MIDDLEWARES DE ERRO */
app.use(errorMiddleware)

let server: any

const start = async () => {
  try {
    farmLog()

    console.log('🧠 Iniciando conexão com o banco de dados TESTAÍ')
    await database.connect()
    console.log('✅ Conectado ao MongoDB com sucesso')

    server = app.listen(port, () => {
      console.log(
        `🤓 Servidor iniciado com sucesso em ${port}, pode fazer requisições meu querido`
      )
    })
  } catch (error) {
    console.error('❌ Falha ao iniciar aplicação', error)
    process.exit(1)
  }
}

const shutdown = async () => {
  console.log('🛑 Graceful shutdown iniciado')

  if (server) {
    server.close(() => {
      console.log('🛑 Servidor HTTP fechado')
    })
  }

  await database.disconnect()
  console.log('🛑 Conexão com o MongoDB fechada')

  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

start()
