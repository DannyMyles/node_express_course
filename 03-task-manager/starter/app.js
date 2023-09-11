const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const cors = require("cors");
const notFoundMiddleware = require("./middleware/not-foundMiddleware");
const errorHandlerMiddleware = require("./middleware/error-handlerMiddleware");
// import the .env configurations
require("dotenv").config();

  // MIDDLEWARES START
  // Adding CORS middleware
  const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:4210"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  
  // Middleware for getting json response
  app.use(express.json());

  // Middle to serve static files
  app.use(express.static("./public"));

    // Serve the "uploads" directory as a static folder.
  app.use('/uploads', express.static('uploads'));
    // Logs HTTP request details to the console or a log file(middleware)
  app.use(morgan("dev"));

  // MIDDLEWARES START END

  // use the tasks route
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", productRoutes)

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
