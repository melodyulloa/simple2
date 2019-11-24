var express = require("express");
var cors = require("cors");
var bodyParser= require("body-parser");

var app= express();

//database connection
require("./database/connection");
var port= process.env.port || 3001;

//router middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
//import Routes
var userRouter = require("./routes/Users");
//Define routes here
app.use("/api",userRouter);



// app.use("/users",Users);
app.listen(port,function(){
    console.log("server is running on port " + port);
})