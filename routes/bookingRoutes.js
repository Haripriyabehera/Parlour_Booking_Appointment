import express from 'express'
import {checkSchema} from 'express-validator'
import {bookingSchema} from '../validators/bookingValidation.js'
import bookingCltr from '../controllers/bookingCltr.js'
import  authenticateUser from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/create", authenticateUser, checkSchema(bookingSchema), bookingCltr.createBooking)
router.get("/getBookings", authenticateUser,bookingCltr.getBooking)
router.get("/getBookingById/:id", authenticateUser,bookingCltr.getBookingById)
router.put('/updateBooking/:id', authenticateUser,bookingCltr.updateBooking)
router.delete('/deleteBooking/:id', authenticateUser,bookingCltr.deleteBooking)

export default router