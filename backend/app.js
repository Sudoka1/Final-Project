import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import personRouter from "./routes/person.js";
import cors from 'cors';

const app = express();
mongoose
  .connect(
    "mongodb+srv://paderbornde:987654321@cluster0.zokj0.mongodb.net/registrieren?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("mit MongoDB Verbunden"));
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/person', personRouter)
app.listen(4000, () => console.log("Server gestarted"));
