var books = require("../models/book.js");
var comment = require("../models/comment.js");

var middleware = {};

middleware.isloggedin = function(req,res,next){
    if(req.isAuthenticated())
     {
         return next();
     }
     req.flash("error","you have to logged in first to do that");
     res.redirect("/login");
};

middleware.commentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("error","something went wrong");
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash("error","You have not permission to do that");
                res.redirect("back");
            }
           
        });

    } else{
        req.flash("error","you have to logged in first to do that");
        res.redirect("/login");
    }
};

middleware.bookOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        books.findById(req.params.id,function(err,foundBook){
            if(err){
                req.flash("error","asomething went wrong");
                res.redirect("back");
            }
            else{
                if(foundBook.creator.id.equals(req.user._id)){
                    return next();
                }
                req.flash("error","you have not permission to do that");
                res.redirect("back");
            }
           
        });

    } else{
        req.flash("error","you have to logged in first to do that");
        res.redirect("back");
    }
}

module.exports = middleware;

