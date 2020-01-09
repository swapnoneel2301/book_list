var express = require("express");
var router = express.Router();
var books = require("../models/book.js");
var comment = require("../models/comment.js");
var middleware = require("../middleware");




//  comment page

router.get("/books/:id/comments/new",middleware.isloggedin,function(req,res){
    books.findById(req.params.id,function(err,foundbook){
        if(err)
         {
             console.log(err);
             req.flash("error","something went wrong");
             res.redirect("/books/"+ req.params.id);
         }
        else{
            res.render("new_comment.ejs",{book:foundbook});
        }
        
    });
});

// comment creation

router.post("/books/:id/comments",middleware.isloggedin,function(req,res){
  books.findById(req.params.id,function(err,foundbook){
      if(err){
        console.log(err);
        req.flash("error","something went wrong");
        res.redirect("back");

      }
       
    else
     {
         comment.create(req.body.comment,function(err,newComment){
             if(err)
              console.log(err);
            else
             {
                 newComment.author.id = req.user._id;
                 newComment.author.username= req.user.username;
                 newComment.save();
                 foundbook.comments.push(newComment);
                 foundbook.save();
                 req.flash("success","you have created new comment successfully");
                 res.redirect("/books/"+ foundbook._id);
             }
         });
     }
  });

});

// comment edit form

router.get("/books/:id/comments/:comment_id/edit",middleware.commentOwnership,function(req,res){
    books.findById(req.params.id,function(err,foundBook){
        if(err){
            req.flash("error","something went wrong");
            res.redirect("back");
        }
        else{
            comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    req.flash("error","something went wrong");
                    res.redirect("back");
                }
                else{
                    res.render("edit_comment.ejs",{book:foundBook,comment:foundComment})
                }
            });

        }
    });
   
});

// comment edit handle
 router.put("/books/:id/comments/:comment_id",middleware.commentOwnership,function(req,res){
     comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment){
         if(err){
            req.flash("error","something went wrong");
             res.redirect("back");
         }
         else{
            req.flash("success","successfully you have edited a comment");
             res.redirect("/books/" + req.params.id);
         }
     });
    
 });

 // comment delete route
  router.delete("/books/:id/comments/:comment_id",middleware.commentOwnership,function(req,res){
      comment.findByIdAndRemove(req.params.comment_id,function(err){
          if(err){
            req.flash("error","something went wrong");
              res.redirect("back");
          }
          else{
            req.flash("success","succefully you delete a comment");
              res.redirect("/books/" + req.params.id);
          }
      });
  });



module.exports = router;
