const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https = require('https');
const { response } = require('express');

const app=express();

//css does not work for our static pages so we have to declare another function
app.use(express.static('public'));//this is the path of the static file
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  //  res.send('mero baje run vayo ta ');
   res.sendFile(__dirname+'/signin.html');//it direct the html file which we have declared in the sendFile
})

app.post('/', function(req, res){
//now pull up the value from html files
const fname=req.body.fname;
const lname=req.body.lname;
const email=req.body.email;
console.log(fname, lname, email);
const data={
member:[
  { 
    email_address: email,
    status: 'subscribed',
    merge_field:{
      FNAME:fname,
      LNAME:lname
    }
  }
]
};
//this is for aunthuncation using mailchimp 
//here only authorized inity only allowed in
const jsonData=JSON.stringify(data);

 const url='https://us14.admin.mailchimp.com/3.0/lists/5bf860ff7c';
 
 const options={
   method: 'POST',
   auth:'60bc399a8fca8213e4ccb193beb139f7-us14'
 }
const request=https.request(url,options,function(){
response.on('data',function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
})
//this is for heroku which run through this server and
// ||3000 is for the the local server
app.listen(process.env.PORT ||3000,function(){
    console.log('surver is running on port 3000');
})
//api mailchimp api key is 60bc399a8fca8213e4ccb193beb139f7-us14
//audiance id 5bf860ff7c