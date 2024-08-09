const express = require('express');
const path =require('path')
const session = require('express-session')
const {v4:uuidv4}=require('uuid')
const nocache=require('nocache')
const router=require('./router');

const app=express()

const port= process.env.PORT||3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(nocache());
app.set('view engine','ejs');

//load static asset

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router)

// home route

app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('base',{title:"Login System"})
    }
    
})
//error
app.get("*",(req,res)=>{
    res.send('error')
})

app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")});


