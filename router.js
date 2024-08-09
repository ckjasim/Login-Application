var express =require('express')
var router  =express.Router();

const credential={
    email:"admin@gmail.com",
    password :"admin123"
}


// Login user

router.post('/login',(req,res)=>{

   if(!req.session.user){
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successful...!")
    }else if (req.body.email!==credential.email&&req.body.password==credential.password){
        const logout="invalid username....!!"
        res.render('base',{logout})
        // res.redirect('/')
    }else if(req.body.email==credential.email&&req.body.password!==credential.password){
        const logout="invalid password....!!"
        res.render('base',{logout})
        // res.redirect('/')
    }else if(req.body.email!==credential.email&&req.body.password!==credential.password){
        const logout="invalid username and password....!!"
        res.render('base',{logout})
        // res.redirect('/')
    }
   }else{
        res.redirect('/')
   }
})

//route for dashboard

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('base')
    }
})

//Route for logout

router.get('/logout',(req,res)=>{
    req.session.user=null
    res.redirect('/route/logoutpage')
})
router.get('/logoutpage',(req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }else{
        const logout="Logout Successfully....!!"
        res.render('base',{logout})
    }
})
module.exports=router;


// router.get('/contact',(req,res)=>{
//     res.send('this is contact')
// })
