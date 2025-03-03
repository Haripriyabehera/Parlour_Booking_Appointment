import Service from "../models/serviceModel.js";

const serviceCltr = {}
// Create a new service
serviceCltr.createService = async (req, res) => {
    const body = req.body 
    const service = new Service(body)
    try {
        const existingService = await Service.findOne({name: body.name})
        if(existingService){
            return res.status(400).json({message: "Service already eexists!"})
        }
        await service.save()
        res.status(201).json({ message: "Service added successufully!", service})
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

// Get all services
serviceCltr.getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
        res.status(200).json(services)
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

// Get a single service by ID
serviceCltr.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        if(!service) {
            return res.status(404).json({message: "Service not found"})
        }
        res.status(200).json(service)
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

//Update a service 
serviceCltr.updateService = async (req, res) => {
    try{
        const {name, description, price, duration, availableSlots} = req.body

        const service = await Service.findById(req.params.id)
        if(!service) {
            return res.status(404).json({message: "Service not found!"})
        }

        service.name = name || service.name
        service.description = description || service.description
        service.price = price || service.price
        service.duration = duration || service.duration
        service.availableSlots = availableSlots || service.availableSlots

        await service.save()
        res.status(200).json({message: "Service update successfully", service})

    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

// Delete a service
serviceCltr.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id)
        if(!service) {
            return res.status(404).json({message: "Service not found!"})
        }
        res.status(200).json({message: "Servie delete successfully!"})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}
export default serviceCltr