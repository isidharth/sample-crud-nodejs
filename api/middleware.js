const jwt = require('jsonwebtoken'),
    {auth} = require('../config')

module.exports = {
    validate:(req,res,next)=>{
        try{
            const token = req.body.token;
            const decodedToken = jwt.verify(token, auth.secret_key);
            const userId = decodedToken.userId;
            req.body.userId = userId
            next();
        }
        catch(err) {
            res.send({auth:false,error:"User not authorized",status:401});
        }
    }
}
