import 'dotenv/config'
import mongoose from 'mongoose'

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = (NODE_ENV === 'test') ? MONGODB_URI_TEST : MONGODB_URI

mongoose.connect(connectionString)

mongoose.connection.on('connected', () => {
  console.info('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
  process.exit(-1)
})

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected')
})

export = mongoose
