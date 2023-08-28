const mongoose  = require("mongoose");

// defining how our task should lok like

const taskSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	name : { type : String, required:true, trim: true, maxlength :[20, 'name cannot be more than 20 characters']},
    completed : { type : Boolean, default:false}
})

module.exports = mongoose.model("Task", taskSchema);

