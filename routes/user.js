const express= require ("express");
const User = require('../models/user');


const router=express.Router();

router.get('/signin', (req, res)=>{
    return res.render('signin');
});

router.get('/signup',(req,res)=>{
    return res.render('signup');
});

router.post('/signup', async (req, res)=>{
    const {fullName, email, password}= req.body;
    try {
    await User.create({ fullName, email, password });
    return res.redirect("/");
  } catch (error) {
    console.error("❌ Signup failed:", error.message);
    res.status(400).send("Signup failed. Check terminal for errors.");
  }
    return res.redirect("/");
});

router.post('/signin', async(req, res)=>{
    const {email, password}= req.body;
    try {
        const token= await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin",{error:
            "Incorrect email or password"
        });
    }
    
});

router.get('/logout', (req,res)=>{
    res.clearCookie('token').redirect('/');
});




module.exports=router;