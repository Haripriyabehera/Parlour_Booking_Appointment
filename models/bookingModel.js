import mongoose, { model } from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true},
    date: { type: Date, required: true},
    timeSlot: { type: String, required: true}, // 10.00 AM - 11.00 AM
    status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending"}

}, { timestamps: true})

const Booking = model("Booking", bookingSchema)

export default Booking