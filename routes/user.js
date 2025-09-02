const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require ("passport");

router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
});


// Password regex (Strong Password Rule)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // 🔹 Step 1: Username check
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash("error", "Username already exist!");
            return res.redirect("/signup");
        }

        // 🔹 Step 2: Email check
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            req.flash("error", "Email already registered!");
            return res.redirect("/signup");
        }

        // 🔹 Step 3: Password validate
        if (!passwordRegex.test(password)) {
            req.flash("error", "Password must include uppercase, lowercase, number, and special character!");
            return res.redirect("/signup");
        }

        // 🔹 Step 4: Register user
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.flash("success", "Welcome, " + username);
        res.redirect("/login");

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) =>{
    res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}),
async (req, res) =>{
    req.flash("success", "welcome you are logged");
    res.redirect("/listings");
}
);



module.exports = router;