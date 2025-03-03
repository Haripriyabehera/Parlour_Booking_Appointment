import User from "../models/authModel.js";

export const userRegisterSchema = {
    name : {
        exists: { errorMessage: "Name is required"},
        notEmpty: { errorMessage: "Name cannot be empty"},
        trim: true
    },
    email: {
        in: ['body'],
        exists: {errorMessage: "Email is required"},
        notEmpty: {errorMessage: "Email cannot be empty"},
        isEmail: {errorMessage: "Email should be in a valid format"},
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async (value) => {
                try{
                    const user = await User.findOne({email: value})
                    if(user) {
                        throw new Error("Email is already taken")
                    }
                } catch (err){
                    throw new Error(err.message)
                }
                return true

            }
        }
    },
    password: {
        exists: {errorMessage: "Password is required"},
        notEmpty: {errorMessage: "Password cannot be empty"},
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
            errorMessage:
                "Password must contain at least one lowercase, one uppercase, one number, one symbol, and be at least 8 characters long"
        }, 
        trim: true,
    }
}

export const userLoginSchema = {
    email: {
        in: ['body'],
        exists: {errorMessage: "Email field is required"},
        notEmpty: {errorMessage: "Email cannot be empty"},
        isEmail: {errorMessage: "Email should be in a valid format"},
        trim: true,
        normalizeEmail: true,
    },
    password: {
        exists: {errorMessage: "Password is required"},
        notEmpty: {errorMessage: "Password cannot be empty"},
        trim: true

    }
}