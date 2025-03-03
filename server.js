import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import serviceRouters from './routes/serviceRoutes.js'
import bookingRouters from './routes/bookingRoutes.js'

dotenv.config()

const app = express()

//middleware
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/service', serviceRouters )
app.use('/api/bookings', bookingRouters)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


