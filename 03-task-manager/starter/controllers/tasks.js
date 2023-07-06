const Task = require("../models/Task");
const mongoose = require("mongoose");
const { ObjectId } =  require('mongodb')
const asyncWrapper = require('../middleware/async')
// Controllers are functions to perform a specific task
const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  // check if task exists
  if (!tasks) {
    return res.status(404).json({ msg: "There were no tasks found!" });
  }
  res.status(200).json({ tasks: tasks });
});

// Handling POST Resquest
const postTasks = asyncWrapper( async (req, res, next) => {
    const tasks = await Task.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      completed: req.body.completed,
    });
    res.status(201).json({ 
		tasks: tasks ,
		msg: "Task added succefully! "
	});
});

// get a singletask
const getTask = asyncWrapper( async (req, res, next) => {
	const {id: taskId} = req.params;
    const task = await Task.findById({_id: ObjectId(taskId)})
      .exec();
	// check if task exists
	  if(!task){
		return res.status(404).json({msg: `No task with id: ${taskId}`})
	  }
    res.status(200).json({task});
});
// Update a Task
const updateTask = asyncWrapper(async(req, res, next) => {
		const {id:updateId} = req.params;
		const task = await Task.findOneAndUpdate({_id: ObjectId(updateId)}, req.body, {
			new : true,
			runValidators:true
		})
		if(!task){
			res.status(404).json({msg: `No task with this Id ${updateId}`})
		}
		res.status(200).json(res.json({ _id: ObjectId(updateId), data: req.body }));

});

// delete a task
const deleteTask = asyncWrapper( async (req, res, next) => {
    const { id: taskId } = req.params;
    const deleteTask = await Task.findByIdAndDelete({ _id: ObjectId(taskId) });

	// check if task exists
    if (!deleteTask) {
      return res.status(404).json({ msg: `no such task found` });
    }
    res.status(201).json(res.json({ deleteTask }));
 
});

module.exports = {
  getAllTasks,
  postTasks,
  getTask,
  updateTask,
  deleteTask,
};
