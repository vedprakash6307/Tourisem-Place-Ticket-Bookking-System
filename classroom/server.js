const express =  require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");



app.use(session({secret:"mysupersecretstring"}));

app.get("/test",(req, res)=>{
    res.send("test succesfull");

});

// app.use(cookieParser("secret"));


// app.get("/getsingnedcookie", (req, res) =>{
//     res.cookie("made-in", "India",{signed:true});
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req, res)=>{
//     console.log(req.signedCookies);
//     res.send("varified");
// });


// app.get("/getcookies",(req, res)=> {
//     res.cookie("greet","hello");
//     res.send("sent you some cookies. Are you interested in coding life?");
// });


// app.get("/", (req, res )=>{
//     console.dir(req.cookies);
//     res.send("hi i am root");
// });
// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, () =>{
    console.log("server are listen to 3000");
});