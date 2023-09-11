const express = require('express')
const router = express.Router()
const { signupUser, loginUser,updateUser } = require ('../controllers/authControllers')

router.route("/auth/signup").post(signupUser)
router.route("/auth/login").post(loginUser)
router.route('/auth/:id').put(updateUser)
// export the routes
module.exports = router