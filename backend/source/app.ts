import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './config/database'
import animalsRouter from './routers/animalsRouter'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use(animalsRouter.router)

app.get('/', async (req, res) => {
	res.json({ message: 'Testaí Backend API is running' })
})

app.listen(port, async () => {
	await connect()
	console.log(`Server is running on port ${port}`)
})
