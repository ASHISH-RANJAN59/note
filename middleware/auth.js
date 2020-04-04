//For Authentication

const jwt=require('jsonwebtoken');
const config=require('config');

module.exports = function(req,res,next){
    const token=req.header('x-Auth-Token');
    if(!token) return res.status(401).send('Accesed Denied');

    try{
        const decode=jwt.verify(token,config.get('jwtPrivateKey'));
        req.users=decode;
        next();
    }
    catch{
        res.status(400).send('Invalid Token');
    }
}