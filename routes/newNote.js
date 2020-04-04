
const {Note,validateNotes}=require('../models/notes');
const auth=require('../middleware/auth');
const _=require('lodash');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
  res.send('USE POSTMAN WITH VALID x-Auth-Token GOT AFTER LOGIN');
});

router.post('/note_added',auth,async(req,res)=>{
  //To validate body request
    const {error}= validateNotes(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Create new note taking Title and Message as input
    let note=new Note(_.pick(req.body,['Title','Message']));

    //save the new note to the note database 
      note= await note.save();
    res.send(note);
    });

 module.exports=router;   