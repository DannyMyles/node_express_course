const express = require('express').Router()
const { signupUser, loginUser,updateUser } = require ('../controllers/authControllers')
const router = require('./taskRoutes')

router.route("/auth/signup").post(signupUser)
router.route("/auth/login").post(loginUser)
router.route('/auth/:id').put(updateUser)
// export the routes
module.exports = router