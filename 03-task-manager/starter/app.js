const express = require("express");
const app = express();
const tasksRoutes = require("./routes/tasks");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const cors = require("cors");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// import the .env configurations
require("dotenv").config();

// MIDDLEWARES START

// Middleware for getting json response
app.use(express.json());

// Middle to serve static files
app.use(express.static("./public"));

// Logs HTTP request details to the console or a log file(middleware)
app.use(morgan("dev"));

// Adding CORS middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4200"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// MIDDLEWARES START END

// use the tasks route
app.use("/api/v1/tasks", tasksRoutes);

// START ERROR HANDLING MIDLEWRES

// Error handling for the defined routes
app.use(notFoundMiddleware);
// Handling any other error in the application
app.use(errorHandlerMiddleware);
// ERROR HANDLING MIDLEWRES END

// Creating a server
const port = process.env.PORT || 3000;

// connect Db then say server is running
const server = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

server();
