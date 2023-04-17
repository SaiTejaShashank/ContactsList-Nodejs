const express=require('express');
const path=require('path');
const port=8005;

const db=require('./config/mongoose');
const Contact=require('./models/contact')
const app=express();

app.use(express.urlencoded(2));

app.use(express.static('assets'));

app.use(function(req,res,next){
    req.myName='saiPunna';
   // console.log('middleware 1 called');
    next();
})

app.use(function(req,res,next){
    //console.log('middleware 2 called',req.myName);
    next();
})

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

var contacts_list=[
    {
        name:'sai',
        phone:'6281745496'
    },
    {
        name:'teja',
        phone:'6281745496'
    },
    {
        name:'shashank',
        phone:'6281745496'
    },
    {
        name:'punna',
        phone:'6281745496'
    }
]

app.get('/',function(req,res){
   // res.send('<h1>Hi Shashank :)</h1>');
   return res.render('home',{title:"My Contacts List",contacts_list:contacts_list});
})

app.get('/practice',function(req,res){
    return res.render('practice',{title:"My Contacts List"});
})

app.post('/create-contact',function(req,res){
    //console.log(req.body,req.myName);

    contacts_list.push(/*{
        name:req.body.name,
        phone:req.body.phone
    }*/
    req.body);
    return res.redirect('/');
})

app.get('/delete-contact',function(req,res){
    let phone=req.query.phone;
    let contactIndex=contacts_list.findIndex(contact=>contact.phone==phone);
    if(contactIndex!=-1){
        contacts_list.splice(contactIndex,1);
    }
    return res.redirect('back');
})
app.listen(port,function(err){
    if(err){
        console.log('error runniing the server :(',err);

    }

    console.log('hi :)');

})