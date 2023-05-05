const jwt = require('jsonwebtoken')
const {config} = require('../config')

function verifyToken(req,res,next){
    const bearerToken = req.headers['authorization']
    console.log('bearer Token : ' + bearerToken)
    if(typeof bearerToken !== 'undefined'){
        //validamos token
        const bearer = bearerToken.split(' ')
        const token = bearer[1]
        console.log('token : ' + token)
        try{
            const decoded = jwt.verify(token,config.jwt_secret)
            console.log(decoded)
            return next()
        }catch(err){
            return res.status(401).json({
                status:false,
                content:err
            })
        }
    }
    else{
        res.status(403).json({
            status:false,
            content:'no se encontro token'
        })
    }
}

module.exports = {verifyToken}