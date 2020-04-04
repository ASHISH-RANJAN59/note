const {Note}=require('../models/notes');
const auth=require('../middleware/auth');
const express=require('express');
const router=express.Router();

//Only allowed if user is registered or logged in.
//To display all notes.
router.get('/',auth,async(req,res)=>{
    const note=await Note.find().sort('Date').select('-__v');
 res.send(note);
 });

 //Only allowed if user is registered or logged in.
 //To display single note.
router.get('/:id',auth,async(req,res)=>{
    const note=await Note.findById(req.params.id).select('-_id -__v');
  if(!note)return res.status(404).send('The type you searched is not available');
  else res.send(note);
  });

  module.exports=router;
