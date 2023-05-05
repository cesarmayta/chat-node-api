const express = require('express')
const {config} = require('./config')
const cors = require('cors')

const userApi = require('./routes/users.routes')
const authApi = require('./routes/auth.routes')
const chatApi = require('./routes/chat.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        'status':true,
        'content':'servidor activo'
    })
})

userApi(app)
authApi(app)
chatApi(app)

app.listen(config.port,()=>console.log("http://localhost:"+config.port))