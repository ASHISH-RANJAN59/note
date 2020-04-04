const express=require('express');
const router=express.Router();
const upload=require('express-fileupload');

router.get('/',async(req,res)=>{
  res.sendfile('./htmlfiles/uploadfile.html');
});

router.post('/uploaded',(req,res)=>{
    let file = req.files.foo;
    const path='./uploads/'+file.name;
    
    //Move file to uploads folder
    file.mv(path,(err)=>{
        if(err) return res.send('error whilee uploading');
        else return  res.send('successfully uploaded');
    });
});

module.exports=router;