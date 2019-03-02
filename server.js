var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//const db = require('./config/database');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/aruna";
var db = null;

app.use(bodyParser.json());

const port = 1234;


MongoClient.connect(url, function(err, db1) {
  if (err) throw err;
  //console.log(db1)
  db = db1;
});

//Given a bank branch IFSC code, get branch details
app.get('/branchdetails', (req,res) => {
  //console.log(req.body.ifsc)
  console.log(req.query.ifsc)
  db.collection("bank").findOne({ "ifsc": req.query.ifsc },function(err, val) {
    if(err)
      return res.status(400).json({
        message : "Req can't be processed"
      });
    if(res==null)
      return res.status(500).json({
        message : "Give IFSC not found"
      });
    else{
      res.send(JSON.stringify(val))
    }
  });

});

app.get('/branchesfromnameandcity', (req,res) => {
  db.collection("bank").findOne({ "bank_name": req.query.bank_name, "city": req.query.city },function(err, val) {
	// var bank_name = req.query.name;
	// var city = req.query.city;

	if(err)
  return res.status(400).json({
    message : "Req can't be processed"
  });
  if(res==null)
  return res.status(500).json({
    message : "Given bank_name and city not found"
  });
else{
  res.send(JSON.stringify(val))
}
});
});



app.listen(port, () => {
    console.log('Server started on port'+port);
  });

module.exports = app;