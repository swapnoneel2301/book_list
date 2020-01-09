var express = require("express");
var router = express.Router();
var books = require("../models/book.js");
var middleware = require("../middleware");



router.get("/",function(req,res){
    res.render("jumbotron.ejs");
});

router.get("/books",function(req,res){

    books.find({},function(err,allBook){
        if(err){
            console.log(err);
            req.flash("error","something went wrong");
            res.redirect("/");

        }
         
        else
        res.render("home.ejs",{allBook:allBook});
    });
   
});

// creating new book

router.get("/books/new",middleware.isloggedin,function(req,res){
    res.render("new.ejs");
});

router.post("/books",middleware.isloggedin,function(req,res){
    books.create(
        //{ name: req.body.name,
        // author: req.body.author }
        req.body.book
    ,function(err,newbook){
        if(err)
         console.log(err);
        else{
            newbook.creator.id = req.user._id;
            newbook.creator.username = req.user.username;
            newbook.save();
            console.log(newbook);

        }
         
        
    });
    req.flash("success","You have created a new book successfully");
    res.redirect("/books");
});

// details of  a particular book

router.get("/books/:id",middleware.isloggedin,function(req,res){
    books.findById(req.params.id).populate("comments").exec(function(err,book){
        if(err)
         console.log(err);
        else
        {
            console.log(book);
            res.render("show.ejs",{book:book});

        }
         
    });
});

//delete

router.delete("/books/:id",middleware.bookOwnership,function(req,res){
    books.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error","something went wrong");
            res.redirect("/books");

        }
        else{
            req.flash("success","you delete a book successfully");
            res.redirect("/books");
        }
         
    });
});

// edit page
router.get("/books/:id/edit",middleware.bookOwnership,function(req,res){
    books.findById(req.params.id,function(err,editBook){
        if(err)
         console.log(err);
        else
         res.render("edit.ejs",{booki:editBook})

    });

});
//edit done
router.put("/books/:id",middleware.bookOwnership,function(req,res){

    // var uptodatebook = {
    //     name:req.body.name ,
    //     author:req.body.author
    // };
    books.findByIdAndUpdate(req.params.id,req.body.book,function(err,updatedBook){
        if(err)
        {
            console.log(err);
            req.flash("error","something went wrong");
            res.redirect("/books");
        }
        
        else{
            req.flash("success","you edit book successfully");
            res.redirect("/books");

        }
    });
    
});



module.exports = router;


