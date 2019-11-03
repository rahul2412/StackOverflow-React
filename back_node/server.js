const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_PORT = 3001;
let uname="";
let flag=1;

app.get('/api/get_name',(req,res)=>{
  
  res.send({user:uname})});

app.post('/api/post_name',(req, res) => {
    console.log(req.body);
    uname=req.body.username;
  });

  app.get('/api/get_status',(req,res)=>{
    console.log("flag status is "+flag);
    res.send({flag:flag})});
  
  app.post('/api/post_status',(req, res) => {
      console.log(req.body);
     if(req.body.loggedIn=="no")
      flag=1;
    });

  

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));