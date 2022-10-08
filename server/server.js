import express from 'express';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();
const app = express();

//middleware part
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// route middleware
fs.readdirSync("./routes").map((r)=> app.use("/api",require(`./routes/${r}`)));

// db connection
mongoose.connect(process.env.DATABASE)
.then(()=> console.log("Mongo connected"))
.catch(err=> {
     console.log("Mongo connection error");
     console.log(err)
})



const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`Server is running on port ${port}`));
