var express = require("express");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require("connect-flash");
var books = require("./models/book.js");
var comment = require("./models/comment.js");
var User = require("./models/user.js");
var booksRoute = require("./routes/books.js");
var commentRoute = require("./routes/comment.js");
var userRoute = require("./routes/user.js");





mongoose.connect("mongodb://localhost:27017/books",{ useNewUrlParser: true ,  useUnifiedTopology: true  });
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "this can be anything",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});




passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ======
// all rotes are here
// ======
app.use(booksRoute);
app.use(commentRoute);
app.use(userRoute);

app.listen(3000,function(){
    console.log("books server has started");
});




// ===============
// ===============
// ALL CODES ARE HERE
// =================
// =================





// delete all things
// var seedDB = require("./models/seed.js");

// seedDB();

//create new book

// books.create({
//     name:"chad",
//     author: "sarat"
// });


// home page

// app.get("/",function(req,res){
//     res.render("jumbotron.ejs");
// })

// app.get("/books",function(req,res){

//     books.find({},function(err,allBook){
//         if(err)
//          console.log(err);
//         else
//         res.render("home.ejs",{allBook:allBook});
//     });
   
// });

// // creating new book

// app.get("/books/new",isloggedin,function(req,res){
//     res.render("new.ejs");
// });

// app.post("/books",isloggedin,function(req,res){
//     books.create(
//         //{ name: req.body.name,
//         // author: req.body.author }
//         req.body.book
//     ,function(err,newbook){
//         if(err)
//          console.log(err);
//         else
//          console.log(newbook);
        
//     });
//     res.redirect("/books");
// });

// // details of  a particular book

// app.get("/books/:id",isloggedin,function(req,res){
//     books.findById(req.params.id).populate("comments").exec(function(err,book){
//         if(err)
//          console.log(err);
//         else
//         {
//             console.log(book);
//             res.render("show.ejs",{book:book});

//         }
         
//     });
// });

// //delete

// app.delete("/books/:id",isloggedin,function(req,res){
//     books.findByIdAndRemove(req.params.id,function(err){
//         if(err)
//          res.redirect("/books");
//         else
//          res.redirect("/books");
//     });
// });

// // edit page
// app.get("/books/:id/edit",isloggedin,function(req,res){
//     books.findById(req.params.id,function(err,editBook){
//         if(err)
//          console.log(err);
//         else
//          res.render("edit.ejs",{booki:editBook})

//     });

// });
// //edit done
// app.put("/books/:id",isloggedin,function(req,res){

//     // var uptodatebook = {
//     //     name:req.body.name ,
//     //     author:req.body.author
//     // };
//     books.findByIdAndUpdate(req.params.id,req.body.book,function(err,updatedBook){
//         if(err)
//         {
//             console.log(err);
//             res.redirect("/books");
//         }
        
//         else{
            
//             res.redirect("/books");

//         }
//     });
    
// });

//  comment page

// app.get("/books/:id/comments/new",isloggedin,function(req,res){
//     books.findById(req.params.id,function(err,foundbook){
//         if(err)
//          {
//              console.log(err);
//              res.redirect("/books/"+ req.params.id);
//          }
//         else{
//             res.render("new_comment.ejs",{book:foundbook});
//         }
        
//     });
// });

// // comment creation

// app.post("/books/:id/comments",isloggedin,function(req,res){
//   books.findById(req.params.id,function(err,foundbook){
//       if(err)
//        console.log(err);
//     else
//      {
//          comment.create(req.body.comment,function(err,newComment){
//              if(err)
//               console.log(err);
//             else
//              {
//                  foundbook.comments.push(newComment);
//                  foundbook.save();
//                  res.redirect("/books/"+ foundbook._id);
//              }
//          });
//      }
//   });

// });

// =========
// users
// =========

// // registration page

// app.get("/register",function(req,res){
//     res.render("register.ejs");
// });

// app.post("/register",function(req,res){
//     var username = new User({username: req.body.username});
//     User.register(username,req.body.password,function(err,user){
//         if(err)
//          {
//              console.log(err);
//              return res.redirect("/register");
//          }
//          passport.authenticate("local")(req,res,function(){
//              res.redirect("/books");
//          });
         
//     });
// });

// //login page

// app.get("/login",function(req,res){
//     res.render("login.ejs");
// });

// app.post("/login",passport.authenticate("local",{
//     successRedirect:"/books",
//     failureRedirect: "/login"
// }),function(req,res){

// });

// //logout
// app.get("/logout",function(req,res){
//     req.logout();
//     res.redirect("/");
// });

// function isloggedin(req,res,next){
//     if(req.isAuthenticated())
//      {
//          return next();
//      }
//      res.redirect("/login");
// }




