const auth=require('../middleware/auth');
const {Note,validateNotes}=require('../models/notes');
const express=require('express');
const router=express.Router();

router.get('/:id',(req,res)=>{
res.send('USE POSTMAN WITH VALID x-Auth-Token GOT AFTER LOGIN');
});

//Only allowed for registered or logged in user. 
router.put('/:id',auth,async(req,res)=>{
   //To validate body of request 
    const {error}=validateNotes(req.body);
if(error) return res.status(400).send(error.details[0].message);

//to find the required note bt id and save the updates into database.
const note=await Note.findByIdAndUpdate(req.params.id,{Title:req.body.Title,Message:req.body.Message},{
    new: true
}).select('-_id -__v');
if(!note) return res.status(404).send('The type you searched is not available');
res.send(note);
});

module.exports=router;
