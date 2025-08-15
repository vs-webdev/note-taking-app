import 'dotenv/config'
import express from 'express'

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.listen(PORT, () => {
  console.log('Server started at Port', PORT)
})