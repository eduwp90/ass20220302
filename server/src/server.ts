import 'dotenv/config'
import './config/DatabaseConfig'
import express, { Application } from "express";
import cors from "cors";
import { Server } from 'node:http';

const apiVersion = process.env.API_VERSION || 'v1'

const router = require(`./api/${apiVersion}/routes/router`)
export const app: Application  = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(router)

export const server: Server = app.listen(PORT, async (): Promise<void> => {
  console.log(`Server running at http://localhost:${PORT}`)
})


