const jwt = require('jsonwebtoken');
module.exports = async (req,res,next)=>{
    const token = req.headers['authorization'];
    if(token){
        const authorization = await jwt.verify(token,'padascretkey');
        next();
    }else{
        res.send('give me token')
    }
}