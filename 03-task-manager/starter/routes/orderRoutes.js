const express = require('express').Router()

// order routes
router.route("/orders").post(signupUser)
router.route("/:id").post(loginUser)

// export the routes
module.exports = router