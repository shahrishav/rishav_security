const router = require("express").Router();
const userController = require('../controllers/userControllers')
const {authGuard} = require ("../middleware/authGuard")


router.post('/create', userController.createUser)


router.post('/login',userController.loginUser)


router.post('/forgot_password', userController.forgotPassword)


router.post('/verify_otp', userController.verifyOtpAndSetPassword)

router.get('/profile', authGuard, userController.viewProfile);  // For viewing profile

router.put('/profile_update', authGuard, userController.updateProfile);  // For updating profile





  module.exports = router