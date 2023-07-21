const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require("cors");
var usersRouter = require('./routes/users');
var bookingRouter = require('./routes/booking')
var movie = require('./routes/create_moovie');




require('./dbconfig.js/db')

//  const corsOptions = "*"
// const corsOptions = {
    //     origin: true, //included origin as true
    //     credentials: true, //included credentials as true
    //   };
   
    const corsOptions = {
        origin: true, //included origin as true
        credentials: true, //included credentials as true
      };
      app.use(cors(corsOptions));
      app.options('*',cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());


app.get('/test/list',(req,res)=>{
    res.send('hello')
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
  })

  app.use('/', usersRouter);
  app.use('/', bookingRouter);
  app.use('/',movie)
  

app.listen(5000, (err,d)=>{
    if(err) console.log(err)
    console.log(`server is running in port ${5000}`)
})



  module.exports = app;
