require('dotenv').config();
let express = require('express');
let app = express();

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use('/public', express.static(__dirname + '/public'));


app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', function(req, res) {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ "message": message });
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  
  next();
}, function(req, res) {
   res.json({time: req.time});
});

app.get('/:word/echo',function(req,res){
  const word = req.params.word;
  res.json({echo: word});
})

app.route('/name').get((req, res) => { var first = req.query.first; var last = req.query.last; var jsonObj = {name: first + ' ' + last}; res.send(jsonObj); }).post();

 module.exports = app;














