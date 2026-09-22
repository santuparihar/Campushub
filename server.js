const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieparser = require('cookie-parser');
const PORT = 3000;

const {connectMongoDb} = require('./connect');
const User = require('./model/schema');
const {restrictologin} = require('./middlewares/auth');

const userRoute = require('./handelr');

connectMongoDb("mongodb://127.0.0.1:27017/campus")
.then(()=> console.log("MongoDb connected"));

const app = express();
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./view"));
app.use(express.static(path.resolve("./view")));

const route = express.Router();
console.log("route start");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use('/' , userRoute);
console.log("working fine");




app.listen(PORT , () =>{
    console.log(`server started on ${PORT}`);
})