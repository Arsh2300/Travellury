
const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupUser=async(req,res)=>{
    try{
        // Create and register a new user
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser= await User.register(newUser,password); 
        console.log(registeredUser);
        // Automatically log in the user after signup
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Travellury");
            res.redirect("/listings");  
        })
            
        // Handle errors like duplicate usernames
    }catch(e){
        req.flash("error","Username already exists");
        res.redirect("/signup");
    }
     
}

module.exports.renderLoginForm=async(req,res)=>{
    res.render("users/login.ejs");    
}

module.exports.loginUser=
async (req,res)=>{
req.flash("success","Travellury");
let redirectUrl=res.locals.redirectUrl ||"/listings";
res.redirect(redirectUrl);
}

module.exports.logoutUser=(req,res,next)=>{
    // Log out the user and redirect
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listings");
    })
}
