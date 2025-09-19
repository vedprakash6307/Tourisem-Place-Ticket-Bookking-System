const User = require("../models/user");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
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
        console.log(registeredUser);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome, " + username);
            res.redirect("/listings");
        });  

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) =>{
    req.flash("success", "welcome you are logged");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
      if(err){
       return next(err);
      } 
      req.flash("success", "you are logged out");
      res.redirect("/listings");
    })
};