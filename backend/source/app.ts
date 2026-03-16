import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './config/database'
import animalsRouter from './routers/animalsRouter'
import { doSomethingMiddleware } from './middlewares/doSomethingMiddleware'
import { farmLog } from './uteis/farmLog'
import morgan from 'morgan'

dotenv.config({ quiet: true })

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(doSomethingMiddleware)
app.use(animalsRouter.router)

app.get('/', async (req, res) => {
  res.json({ message: 'Testaí Backend API is running' })
})

farmLog()
connect().then(() =>
  app.listen(port, () => {
    console.log(
      '🤓 Servidor iniciado com sucesso, pode fazer requisições meu querido'
    )
  })
)
