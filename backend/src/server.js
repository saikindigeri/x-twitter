import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";


import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
const app = express();
app.use(cors());    
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users",userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to X Twitter Clone Backend");
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (err) { 
    console.error("Error starting the server", err);
    process.exit(1);
  }
};

startServer();
