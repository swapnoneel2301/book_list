var books = require("./book.js");
function seed(){
    books.remove({},function(err){
        if(err)
         console.log(err);
        else
         console.log("all removed");
         
    });
}

module.exports = seed;
