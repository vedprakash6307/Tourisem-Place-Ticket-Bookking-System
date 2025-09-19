if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



const express = require("express");// requring to express
const app = express(); //creating router for express
const mongoose = require("mongoose");// Requiring mongoose for database document form in .js file
const Listing= require("./models/listing.js");//Require listing.ejs files
const path = require("path"); //requiring the path
const ejsMate = require("ejs-mate");  //require ejs-mate for more than adding 
const wrapAsync =require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore =require("connect-mongo");
const listingRouter = require("./routes/listing.js");
const reviewRouter =  require("./routes/review.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");

 
const methodOverride = require("method-override");//Requiring method overriding for update data and delete data
const user = require("./models/user.js");

const dbUrl  =process.env.ATLASDB_URL;

     main() //this is main fun
      .then(()=>{
        console.log("connect to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){ // async function are connnect with mongoose document
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");//this is a setup view engine for ejs files aquiring in js files
app.set("views", path.join(__dirname,"views"));//set views directory in files
app.use(express.urlencoded({extended:true}));//
app.use(methodOverride("_method"));//use this method method overriding code dalete data
app.engine("ejs",ejsMate);//use this method aquiring ejsMate function 
app.use(express.static(path.join(__dirname, "/public")));//use directory in file aquiring

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter:24 * 3600,
});
store.on("error", () =>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions ={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 *60 *1000,
        maxAge: 7* 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};

// app.get("/", (req, res)=>{ //creating a server root and send response in your screen
//     res.send("hi i am root");
// });

 
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
});

app.listen(8080,()=>{ //create a server and listen:8080
    console.log("server is listening to port :8080");
});