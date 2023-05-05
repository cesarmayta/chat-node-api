const express = require('express')
const jwt = require('jsonwebtoken')
const {config} = require('../config')

const UserService = require('../services/user.service')

function authApi(app){
    const router = express.Router()
    app.use('/auth',router)

    objUser = new UserService()

    router.post('/',async function(req,res){
        const {body : user} = req

        const authUser = await objUser.authenticate({user})
        if(authUser.id > 0){
            const token = jwt.sign(
                authUser,
                config.jwt_secret,
                {
                    expiresIn:'1h'
                }
            )
            res.status(200).json({
                status:true,
                content:token
            })
        }else{
            res.status(401).json({
                status:false,
                content:'datos invalidos'
            })
        }
    })
}

module.exports = authApi