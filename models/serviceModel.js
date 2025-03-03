import { Schema, model } from 'mongoose'

const serviceSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String,},
    price: {type: Number, required: true},
    duration: {type: Number, required: true},
    availableSlots: {type: Number, required: true}
}, {timestamps: true})

const Service = model('Service', serviceSchema)

export default Service