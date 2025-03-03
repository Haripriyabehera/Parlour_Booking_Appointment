import express from 'express'
import serviceCltr from '../controllers/serviceCltr.js'
import authenticateUser from '../middleware/authMiddleware.js'
import authorizeUser from '../middleware/authorize.js'

const router = express.Router()

router.post('/create', authenticateUser, authorizeUser(['admin']),serviceCltr.createService)
router.get('/getAllServices',serviceCltr.getAllServices)
router.get('/getServiceById/:id', serviceCltr.getServiceById)
router.put('/updateService/:id', authenticateUser, authorizeUser(['admin']), serviceCltr.updateService)
router.delete('/deleteService/:id', authenticateUser, authorizeUser(['admin']),serviceCltr.deleteService)

export default router