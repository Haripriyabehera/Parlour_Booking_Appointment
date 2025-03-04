import express from 'express'
import authController  from '../controllers/authCltr.js'
import { checkSchema } from 'express-validator'
import { userRegisterSchema, userLoginSchema } from '../validators/authValidation.js'
import  authenticateUser  from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/register', checkSchema(userRegisterSchema), authController.register)
router.post("/login", checkSchema(userLoginSchema), authController.login)
router.get("/user/profile", authenticateUser, authController.profile)
router.put("/user/updateProfile", authenticateUser,authController.updateProfile)
router.delete('/user/remove', authenticateUser,authController.deleteUser )
router.get("/allAdmins", authController.allAdmins)
router.get("/allUsers", authController.allUsers)

export default router