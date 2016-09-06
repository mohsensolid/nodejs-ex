var express = require('express');
var furitsRouter = express.Router();

var route = function(Furit){
var cfuritController = require('../controllers/furitControllers.js')(Furit);



furitsRouter.route('/available')
.get(function(req,res){
Furit.find({ Available: true },function(err,furits){
                  if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.json(furits);
        }

});
});

furitsRouter.use(function(req,res,next){
     if(req.decoded.Admin)
         {  
             next();
         }
        else
        {
           res.json([]);
        }
});
furitsRouter.route('/')
.post(cfuritController.post)
.get(cfuritController.get);

furitsRouter.route('/:furitid/changed')
.patch(function(req,res){
    
Furit.findByIdAndUpdate(req.params.furitid, { $set: { Available: req.body.Available } },function(err,furit){
 
                 if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.json(furit);
        }

});
});
furitsRouter.use('/:furitid',function(req,res,next){
var query = {};
     Furit.findById(req.params.furitid,function(err,furit){
        
        if(err)
        {
        res.status(500).send(err);
        }else if (furit)
        {
            req.furit = furit;
             next();
        }
        else{
        res.status(404).send('furit not Found !!');
        }
      
    });
});
furitsRouter.route('/:furitid')



.get(function(req,res){
   
    res.send(req.furit);
   
})
// .put(function(req,res){
//          req.furit.FuritName = req.body.FuritName;
//          req.furit.FuritImage = req.body.FuritImage;
//          req.furit.FuritCount = req.body.FuritCount;
//          req.furit.FuritType = req.body.FuritType;
//          req.furit.FuritType1 = req.body.FuritType1;
//          req.furit.FuritType2 = req.body.FuritType2;
//          req.furit.FuritType3 = req.body.FuritType3;
//          req.furit.FuritType4 = req.body.FuritType4;
//          req.furit.FuritType5 = req.body.FuritType5;
//          req.furit.FuritType6 = req.body.FuritType6;
//          req.furit.Available = req.body.Available;
         
//          req.furit.save(function(err){
//                  if(err)
//         {
//             res.status(500).send(err);
//         }
//         else{
//             res.json(req.furit);
//         }
//          });
// }
// )
.patch(function(req,res){
        
    if(req.body._id)
        delete req.body._id;
    for(var p in req.body)
    {
        req.furit[p] = req.body[p];
    }
    req.furit.save(function(err){
        if(err)
        {
            res.status(500).send(err);
        }
        else{
          
            res.json(req.furit);
        }
    });
})
.delete(function(req,res){
    req.furit.remove(function(err){
        if(err)
        {
            res.send(err);
        }else
        res.status(204).send('Success');
    });
    
});

return furitsRouter;
};
module.exports = route;