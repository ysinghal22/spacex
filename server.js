var express = require('express');
var app = express();

// const bodyParser = require('body-parser');

var port = 7077;


// app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log("server started at port "+port);
})

app.use('/', require('./router'));

