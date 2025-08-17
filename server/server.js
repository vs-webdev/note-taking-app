import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose';
import authRouter from './src/routes/auth.routes.js';
import cors from "cors"

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use("/api/auth", authRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conncted"))
  .catch(error => {
    console.log("MongoDB connection error:", error)
  })

app.listen(PORT, () => {
  console.log('Server started at Port', PORT)
})