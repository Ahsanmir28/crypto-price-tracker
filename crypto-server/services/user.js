const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getUser = async (email, password) => {
    try {
        const userByEmail = await UserModel.findOne({ email: email })

        if(!userByEmail) return null
        let isValidPassword = bcrypt.compareSync(password, userByEmail.password);
        if(!isValidPassword) return null
        return userByEmail
    } catch (error) {
        return null
    }
}

const registerUser = async (email, password) => {
    try {
        // console.log(email, password)
        const alreadyExist = await UserModel.findOne({ email });
        if (alreadyExist) return null
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await UserModel({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return newUser
    } catch (error) {
        console.log(error)
        return null
    }
}

const setFavourites = async (email, favoruites) => {
    try {
        const user = await UserModel.findOne({email})
        if(!user) return null
        user.favourites = favoruites
        await user.save()

        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getUser,
    registerUser,
    setFavourites
}