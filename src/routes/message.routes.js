const express = require('express')
const MessageService = require('../services/message.service')

const boom = require('@hapi/boom')

//middlewares
const {verifyToken} = require('../middlewares/auth.handler')

function messageApi(app){
    const router = express.Router();
    app.use('/message',router)

    const objMessage = new MessageService();

    router.post('/',verifyToken
        ,async function(req,res){
        const {body : data} = req;
        console.log(data);
        try{
            const newData = await objMessage.create({data})
            res.status(201).json({
                status:true,
                content:newData[0]
            })
        }catch(err){
            res.status(500).json(boom.badData(err))
        }
    })

    router.get('/chat/:chatid',async function(req,res){
        const {chatid} = req.params
        try{
            const data = await objMessage.getByChatId(chatid);
            if(data.length > 0){
                res.status(200).json({
                    status:true,
                    content:data
                })
            }else{
                res.json(boom.notFound('no hay registros'))
            }
        }catch(err){
            res.status(500).json(boom.badData('error : ' + err))
        }
    })
}

module.exports = messageApi