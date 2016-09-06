var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var auth = require('basic-auth');
var jwt = require('jwt-simple');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 5000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
// var port = process.env.PORT || 5000 ;

var db = mongoose.connect('mongodb://mohsen:mohsen@ds139715.mlab.com:39715/myfirstdb');

var Book = require('./models/bookModels.js');
var Furit = require('./models/furit.js');
var Order = require('./models/orderModel.js');
var User = require('./models/userModels.js');
var UserRequest = require ('./models/userRequestModel.js');
var Message = require('./models/messageModels.js');



app.use(bodyParser.urlencoded({ extended :true}));
app.use(bodyParser.json());
app.use(cookieParser());

require('./config/passport.js')(app);

userRouter = require('./routes/UserRouter.js')(User);
app.use('/api/users',userRouter);

app.get('/',function(req,res) {
    res.send('Hello To My Api');
});

userRequestRouter = require('./routes/UserRequestRouter.js')(UserRequest);
app.use('/api/request',userRequestRouter);


app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
        try {
    var decoded = jwt.decode(token, 'secret');
        req.decoded = decoded; 
            next();

  } catch (err) {
      res.json({ success: false, message: 'Failed to authenticate token.' });
    }
} 
else
{
    res.json({success:false,message:'Token not Provided!'});
}
});

    // verifies secret and checks exp
    //  var decoded = jwt.decode(token, 'secret');    
    //    console.log(decoded);
    //   if (decoded===null) {
    //      res.json({ success: false, message: 'Failed to authenticate token.' });    
    //   } else {
    //     // if everything is good, save to request for use in other routes
    //     req.decoded = decoded;    
    //     next();
    //   }


booksRouter = require('./routes/BookRouter.js')(Book);
furitRouter = require('./routes/FuritRouter.js')(Furit);
orderRouter = require('./routes/OrderRouter.js')(Order,User);
messageRouter = require('./routes/MessageRouter.js')(Message);



// app.use(function (req, res,next) {
//   var credentials = auth(req);

//   if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
//     res.statusCode = 401;
//     res.setHeader('WWW-Authenticate', 'Basic realm="example"');
//     // res.redirect('/');
//     res.end('Access denied');
//   } else {
//     // res.end('Access granted');
//     next();
//   }
// });

app.use('/api/books',booksRouter);
app.use('/api/furits',furitRouter);
app.use('/api/orders',orderRouter);
app.use('/api/messages',messageRouter);

io = require('./io/io.js')(io);
server.listen(server_port,server_ip_address, function(){
    console.log('Server Start'+server_ip_address+' ON Port '+server_port);
});