
const Joi=require('joi');
const passwordHash=require('password-hash');
const _=require('lodash');
const {User}=require('../models/users');
const express=require('express');
const router=express.Router();


router.post('/',async (req,res)=>{
//For validation of body request
 const {error}=validate(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 //For verification of user email
 let user=await User.findOne({email:req.body.email});
 if(!user) return res.status(400).send('Invalid email or password');
 
 //For verification of user password
 const validPassword=await passwordHash.verify(req.body.password,user.password);
 if(!validPassword) return res.status(400).send('Invalid email or password');

 const token=user.generateAuthToken();     //To generate jwt token
 res.send("x-Auth-Token-------"+token+"----------LOGGED IN SUCCESSFULLY");
});

//Function to validate body request
function validate(req){
    const schema={
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(req,schema);
}

module.exports=router;