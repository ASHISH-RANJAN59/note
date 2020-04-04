const mongoose=require('mongoose');
const Joi=require('joi');

const NoteSchema=new mongoose.Schema({
       Title:{
           type:String,
           required:true,
           maxlength:100
       },
       Message:{
           type:String,
       },
       Date:{
           type:Date,
           default:Date.now
       },
});

const Note=mongoose.model('Note',NoteSchema);

function validateNotes(notes){
    const schema={
         Title:Joi.string().required().max(100),
         Message:Joi.string()
    };
    return Joi.validate(notes,schema);
}

exports.Note=Note;
exports.validateNotes=validateNotes;