const userServices = require('../services/user')

const loginController = async (req, res) => {
    try {
        const response = await userServices.getUser(req.body.email, req.body.password)
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')        
    }
}

const RegisterController = async (req, res) => {
    try {
        const response = await userServices.registerUser(req.body.email, req.body.password)
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')        
    }
}

const editFavourites = async (req, res) => {
    try {
        const response = await userServices.setFavourites(req.body.email, req.body.favourites)
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')        
    }
}

module.exports = {
    loginController,
    RegisterController,
    editFavourites
}