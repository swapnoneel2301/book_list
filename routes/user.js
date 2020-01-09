var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");




// registration page

router.get("/register",function(req,res){
    res.render("register.ejs");
});

router.post("/register",function(req,res){
    var username = new User({username: req.body.username});
    User.register(username,req.body.password,function(err,user){
        if(err)
         {
             console.log(err);
             req.flash("error",err.message);
             return res.redirect("/register");
         }
         passport.authenticate("local")(req,res,function(){
            req.flash("success","hey " + user.username + " welcome to books page");
             res.redirect("/books");
         });
         
    });
});

//login page

router.get("/login",function(req,res){
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/books",
    failureRedirect: "/login"
}),function(req,res){

});

//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","you have logged out");
    res.redirect("/");
});


module.exports = router;
