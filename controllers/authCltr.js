import User from '../models/authModel.js'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator"

const authController = {}

// User Registration 
authController.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const body = req.body
    const user = new User(body)
    // const {name, email, password, role} = req.body;
    try {
        const salt = await bcryptjs.genSalt()
        user.password = await bcryptjs.hash(body.password, salt)
        await user.save()
        res.status(201).json({message: "User registration successfully", user})
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: 'Somthing went wrong'})
    }
}

// User Login 
authController.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
       return  res.status(400).json({errors: errors.array()})
    }

   const body = req.body
   try {
    const user = await User.findOne({email: body.email})
    if (!user) {
        return res.status(404).json({message: "Invalid email or password"})
    }

    const isMatch = await bcryptjs.compare(body.password, user.password)
    if(!isMatch) {
        return res.status(404).json({message: "Invalid email or password"})
    }

    const token = jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )
    
    res.status(200).json({token: `Bearer ${token}`})
   }
   catch (error) {
    res.status(500).json({message: error.message})
   }
}

// User  profile 
authController.profile = async (req, res) => {
    try{
        const user = await User.findById(req.currentUser.userId)
        // console.log(user)

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message: "Welcome to your profile"})

    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}

// update profile
authController.updateProfile = async (req, res) => {

    const userId = req.currentUser.userId
    const { password, ...updateData} = req.body

    try {
        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if(!updateUser) {
           return res.status(404).json({message: "User not found"})
        }

        if(password) {
            const salt = await bcryptjs.genSalt()
            updateUser.password = await bcryptjs.hash(password, salt)
            await updateUser.save()
        }
        
        res.json({ success: true, data: updateUser})
    }
    catch(error) {
        res.status(500).json({ error: error.message})
    }
}

// Delete a user 
authController.deleteUser = async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ message: "Unauthorized. Please log in again." });
    }
    const userId = req.currentUser.userId
    try {
        const user = await User.findByIdAndDelete(userId)
        if(!user) {
            res.status(404).json({message: "User not found"})
        }
        res.json({ message: "User deleted successfully"})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

// All admin users
authController.allAdmins = async (req, res) => {
    
    try {
        const admins = await User.find({role: "admin"})

        if(!admins.length) {
            return res.status(404).json({ sucess: false, message: "No admin users found"})
        }
        res.json({ success: true, data: admins})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }

}

//Get all users
authController.allUsers = async (req, res) => {
    try {
        const users = await User.find({role: "user"})
        if(!users.length) {
            return res.status(404).json({message: "No users found"})
        }
        res.json({ success: true, data: users})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}

export default authController

