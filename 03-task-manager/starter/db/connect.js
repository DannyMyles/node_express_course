const mongoose = require("mongoose");
// Connecting to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully!");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

module.exports = connectDB;
