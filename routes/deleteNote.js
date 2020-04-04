const auth=require('../middleware/auth');
const {Note}=require('../models/notes');
const express=require('express');
const router=express.Router();

router.get('/:id',(req,res)=>{
  res.send('USE POSTMAN WITH VALID x-Auth-Token GOT AFTER LOGIN');
});

//Only allowed to registered or logged in user.
//To delete the required note from the database.
router.delete('/:id',auth,async(req,res)=>{
    const note=await Note.findByIdAndRemove(req.params.id);
    if(!note) return res.status(404).send('The type you searched is not available');
    return res.send(note);
});

module.exports=router;