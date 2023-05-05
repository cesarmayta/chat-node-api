const express = require('express')
const UserService = require('../services/user.service')

const boom = require('@hapi/boom')

function userApi(app){
    const router = express.Router()
    app.use('/users',router)

    const objUser = new UserService()

    router.post('/',async function(req,res){
        const {body : user} = req
        try{
            const data = await objUser.create({user})
            res.status(201).json({
                status:true,
                content:data
            })
        }catch(err){
            res.status(500).json(boom.badData(err))
        }
    })
}

module.exports = userApi