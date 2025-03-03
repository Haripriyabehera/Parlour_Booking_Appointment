import Booking from "../models/bookingModel.js";
// import Service from "../models/serviceModel.js";

const bookingCltr = {}

// Creating booking app
bookingCltr.createBooking = async (req, res) => {
    try {
        const {service, date, timeSlot} = req.body

        const existingBooking = await Booking.findOne({ user: req.currentUser.userId, service })
        if(existingBooking) {
            return res.status(400).json({ message: "You have already booked this service."})
        }

        const newBooking = new Booking({ user: req.currentUser.userId, service, date, timeSlot})
        await newBooking.save()

        res.status(201).json({ message: "Booking Created", newBooking})
    }
    catch(error) {
        res.status(500).json({ error: error.message})
    }
}

// Get all booking 
bookingCltr.getBooking = async (req, res) => {
    try {
        const booking = await Booking.find().populate('user', "name email").populate("service", 'name price')
        res.status(200).json(booking)
    }
    catch(error) {
        res.status(500).json({ error: error.message})
    }
}

// Get booking by ID
bookingCltr.getBookingById = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id).populate('user service')
        if(!booking) {
            return res.status(404).json({ message: "Booking not found!"})
        }
        res.status(500).json(booking)
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

// Update booking 
bookingCltr.updateBooking = async (req,res) => {
    try{
        const booking = await Booking.findById(req.params.id)
        if(!booking) {
            return res.status(404).json({ message: "Booking not found!"})
        }

        const body =  req.body
        booking.service = body.service || booking.service
        booking.date = body.date || booking.date
        booking.timeSlot = body.timeSlot || booking.timeSlot
        booking.status = body.status || booking.status

        await booking.save()

        res.status(200).json({ message: "Booking update Successfully!", booking})
    }
    catch (error) {
        res.status(500).json({ error: error.message})
    }
}

//Delete a booking 
bookingCltr.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id)
        if(!booking) {
            return res.status(404).json({ message: "Booking not found!"})
        }

        res.status(200).json({ message: "Booking deleted successfuly!"})
    }
    catch (error){
        res.status(500).json({ error: error.message})
    }
}

export default bookingCltr