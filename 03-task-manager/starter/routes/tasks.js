const express = require('express');
const router = express.Router()
const {
  getAllTasks,
  postTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// Chaining the get and post request because we are hitting the same endpoint
router.route('/').get(getAllTasks).post(postTasks)

// get a single task, updating and deleting
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)




// export the routes
module.exports = router