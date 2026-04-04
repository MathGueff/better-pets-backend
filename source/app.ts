import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { doSomethingMiddleware } from './middlewares/doSomethingMiddleware'
import { farmLog } from './utils/farmLog'
import morgan from 'morgan'
import { errorMiddleware } from './middlewares/errorMiddleware'
import animalsRouter from './routers/animalsRouter'
import healthRouter from './routers/healthRouter'
import { database } from './config/database'
import swaggerUi from 'swagger-ui-express'
import { generateSwaggerDocs } from './config/swagger'

dotenv.config({ quiet: true })

const app = express()
const swaggerDocument = generateSwaggerDocs()
const port = process.env.PORT || 3000

/* MIDDLEWARES */
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(doSomethingMiddleware)

/* ROTAS */
app.use(healthRouter.router)
app.use(animalsRouter.router)

/* DOCUMENTAÇÃO */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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

start()
