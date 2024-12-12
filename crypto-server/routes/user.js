const router = require('express').Router()
const userController = require('../controller/user')

router.post('/login', userController.loginController)
router.post('/register', userController.RegisterController)
router.put('/favourites', userController.editFavourites)

module.exports = router