const express = require('express')
const ChatService = require('../services/chat.service')

const boom = require('@hapi/boom')

//middlewares
const {verifyToken} = require('../middlewares/auth.handler')

function chatApi(app){
    const router = express.Router();
    app.use('/chat',router)

    const objChat = new ChatService();

    router.get('/',verifyToken,async function(req,res){
        try{
            const data = await objChat.getAll()
            res.status(200).json({
                status:true,
                content:data
            })
        }catch(err){
            //console.log(err)
            res.status(500).json(boom.badData('ERROR DEL SERVIDOR'))
        }
    })

    router.post('/',verifyToken
        ,async function(req,res){
        const {body : data} = req;
        console.log(data);
        try{
            const newData = await objChat.create({data})
            res.status(201).json({
                status:true,
                content:newData[0]
            })
        }catch(err){
            res.status(500).json(boom.badData(err))
        }
    })

    router.get('/:id',async function(req,res){
        const {id} = req.params
        try{
            const data = await objChat.getById(id);
            if(data.length > 0){
                res.status(200).json({
                    status:true,
                    content:data[0]
                })
            }else{
                res.json(boom.notFound('no hay registros'))
            }
        }catch(err){
            res.status(500).json(boom.badData('error : ' + err))
        }
    })
}

module.exports = chatApi