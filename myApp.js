var express = require('express');
var app = express();




// making middle ware 
function mid (req,res,next){
console.log(`${req.method} ${req.path} - ${req.ip}`);
next();

}

// using middleware for all requests
app.use(mid);



// app.post(mid) for using middleware for post requests



app.get("/",(req,res)=>{
res.sendFile('views/index.html',{ root : __dirname});
})

app.use("/public", express.static(__dirname + "/public"));







app.get("/json",(req,res)=>{
const obj = {"message": "Hello json"};
const obj1 = {"message":"HELLO JSON"};
if(process.env.MESSAGE_STYLE === 'uppercase'){
  return res.json(obj1)
}
return res.json(obj);
})


// using middleware for a specific route
app.get("/now",function(req,res,next){
  req.time = new Date().toString();
  next();
},(req,res)=>{
  res.json({"time":req.time});
})

app.get('/:words/echo', (req,res)=>{
return res.json({"echo":req.params.words});
})


// console.log("Hello World");
 module.exports = app;
