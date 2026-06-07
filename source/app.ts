import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { database } from './config/database'
import { generateSwaggerDocs } from './config/swagger'
import { AnimalsRouter } from './domains/animals/animal.router'
import { HealthRouter } from './domains/health/health.router'
import { UserRouter } from './domains/users/user.router'
import { errorMiddleware } from './middlewares/error-middleware.ts'

dotenv.config({ quiet: true })

const app = express()
const swaggerDocument = generateSwaggerDocs()
const port = process.env.PORT || 3000

/* MIDDLEWARES */
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// app.use(doSomethingMiddleware)

/* ROTAS */
app.use(new HealthRouter().router)
app.use(new AnimalsRouter().router)
app.use(new UserRouter().router)

/* DOCUMENTAÇÃO */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* MIDDLEWARES DE ERRO */
app.use(errorMiddleware)

let server: any

const start = async () => {
  try {
    console.log(`
            ^__^               /\\_/\\          ,~.           / \\__
            (oo)\\_______      ( o.o )         (o o)         (    @\\___
            (__)\\       )    \\/  > ^ <       /  V  \\        /         O
                ||----w |     (     )       /(     )\\      /   (_____/
                ||     ||      ^^ ^^         ^^   ^^       /_____/   U
    `)

    console.log('🧠 Iniciando conexão com o banco de dados Better-Pets')
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
