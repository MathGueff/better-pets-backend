import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './config/database'
import { doSomethingMiddleware } from './middlewares/doSomethingMiddleware'
import { farmLog } from './uteis/farmLog'
import morgan from 'morgan'
import { errorMiddleware } from './middlewares/errorMiddleware'
import animalsRouter from './routers/animalsRouter'
import healthRouter from './routers/healthRouter'

dotenv.config({ quiet: true })

const app = express()
const port = process.env.PORT || 3001

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

farmLog()
connect().then(() =>
  app.listen(port, () => {
    console.log(
      '🤓 Servidor iniciado com sucesso, pode fazer requisições meu querido'
    )
  })
)
