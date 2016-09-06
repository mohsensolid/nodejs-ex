var express = require('express');
var booksRouter = express.Router();

var route = function(Book){
var cbookController = require('../controllers/bookControllers.js')(Book);

booksRouter.route('/')
.post(cbookController.post)
.get(cbookController.get);
booksRouter.use('/:bookid',function(req,res,next){
var query = {};
     Book.findById(req.params.bookid,function(err,book){
        if(err)
        {
        res.status(500).send(err);
        }else if (book)
        {
            req.book = book;
             next();
        }
        else{
        res.status(404).send('Book not Found !!');
        }
    });
});
booksRouter.route('/:bookid')
.get(function(req,res){
    res.send(req.book);
   
})
.put(function(req,res){
         req.book.title = req.body.title;
         req.book.author = req.body.author;
         req.book.genre = req.body.genre;
         req.book.read = req.body.read;
         req.book.save(function(err){
                 if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.json(req.book);
        }
         });
}).patch(function(req,res){
    if(req.body._id)
        delete req.body._id;
    for(var p in req.body)
    {
        req.book[p] = req.body[p];
    }
    req.book.save(function(err){
        if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.json(req.book);
        }
    });
})
.delete(function(req,res){
    req.book.remove(function(err){
        if(err)
        {
            res.send(err);
        }else
        res.status(204).send('Success');
    });
});

return booksRouter;
};
module.exports = route;