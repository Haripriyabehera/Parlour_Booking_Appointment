import Service from "../models/serviceModel.js";
import User from "../models/authModel.js";

export const bookingSchema = {
    user: {
        in: ["body"],
        exists: { errorMessage: "User ID is required" },
        notEmpty: { errorMessage: "User ID cannot be empty" },
        isMongoId: { errorMessage: "Invalid User ID format" },
        custom: {
            options: async (value) => {
                const user = await User.findById(value)
                if(!user) {
                    throw new Error("User not found")
                }
                return true
            }
        }
    },
    service: {
        in: ["body"],
        exists: { errorMessage: "Service ID is required" },
        notEmpty: { errorMessage: "Service ID cannot be empty" },
        isMongoId: { errorMessage: "Invalid Service ID format" },
        custom: {
            options: async (value) => {
                const service = await Service.findById(value);
                if (!service) {
                    throw new Error("Service not found");
                }
                
                return true
            }
        }
    },
    date: {
        in: ["body"],
        exists: { errorMessage: "Booking date is required"},
        notEmpty: { errorMessage: "Booking date cannnot be empty" },
        isISO8601: {errorMessage: "Invalid date fromat. Use YYYY-MM-DD"},
        trim: true
    },
    timeSlot: {
        in: ['body'],
        exists: { errorMessage: "Time slot is required" },
        notEmpty: { errorMessage: "Time slot cannot be empty"},
        isString: { errorMessage: "Time slot must be a string"},
        trim: true
    }
}