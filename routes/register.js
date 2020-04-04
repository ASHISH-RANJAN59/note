
const passwordHash=require('password-hash');
const _=require('lodash');
const {User,validateUser}=require('../models/users');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    res.sendfile('./htmlfiles/register.html');
 });

router.post('/user_registered',async (req,res)=>{
//For validation of body request
 const {error}=validateUser(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 //To avoid duplicate email
 let user=await User.findOne({email:req.body.email});
 if(user) return res.status(400).send('user already register');

  //create user profile with name email and password
 user=new User(_.pick(req.body,['name','email','password']));

 //Hashpassword
 user.password=await passwordHash.generate(user.password);

 //Save new user profile to the user database
 await user.save();

 //generate jwt for the registered user
const token=user.generateAuthToken();
res.header('x-Auth-Token',token).send(_.pick(user,['_id','name','email']));
});

module.exports=router;