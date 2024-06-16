import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());

// Connect to the database
const mongoDBUrl = process.env.MONGO_DB_URL;
if (!mongoDBUrl) {
  console.error("MongoDB URL is not defined in environment variables");
  process.exit(1);
}

mongoose.connect(mongoDBUrl, {})
  .then(() => console.log("Connected to database"))
  .catch(err => {
    console.error("Error connecting to the database", err);
    process.exit(1);
  });

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

// Middleware to parse requests of content-type - application/json
app.use(express.json());
// Middleware to parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use user route
app.use(userRoutes);

// Setup server to listen on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});

