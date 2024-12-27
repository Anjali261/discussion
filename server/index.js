const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const authRoutes = require("./routes/authRoute");
const upload = require('express-fileupload');
const awsConfig = require('./config');
console.log('AWS Region:', awsConfig.region);


const app = express();


app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))

app.use(cors({credentials:true , origin:"http://localhost:3000"}));
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/auth', authRoutes);

mongoose.set('strictQuery', false);

const connectDB = async() =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true, 


        })
        console.log(`MongoDB connected: ${con.connection.host}`);
        
    }catch(error){ 
        console.log(error);
        process.exit(1);

    }
}
//database config
connectDB();
app.listen(process.env.PORT , () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

