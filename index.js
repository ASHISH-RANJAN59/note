const Joi=require('joi');
const config=require('config');
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const upload=require('express-fileupload');
const register=require('./routes/register');
const login=require('./routes/login');
const newNote=require('./routes/newNote');
const getNote=require('./routes/getNotes');
const editNote=require('./routes/editNote');
const deleteNote=require('./routes/deleteNote');
const uploadfile=require('./routes/uploadfile');
const app=express();

if(!config.get('jwtPrivateKey')){
    console.error('FATEL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
 }

mongoose.connect('mongodb://localhost/note')
   .then(()=>console.log('connected to Mongodb..'))
   .catch(err=>console.log('error in conneccting to Mongodb..',err));


app.use(express.json());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/register',register);
app.use('/login',login);
app.use('/newNote',newNote);
app.use('/getNote',getNote);
app.use('/editNote',editNote);
app.use('/deleteNote',deleteNote);
app.use('/uploadfile',uploadfile);

app.get('/',async(req,res)=>{
   res.sendfile('./htmlfiles/login.html');
});

app.listen('3000',()=>{
    console.log('listining on port 3000...');
    });
    