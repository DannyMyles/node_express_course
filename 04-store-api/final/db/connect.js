const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
	try {
	  mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
	  console.log("DB Connected Successfully!");
	} catch (error) {
	  console.error("Error connecting to DB:", error);
	}
  };

module.exports = connectDB
