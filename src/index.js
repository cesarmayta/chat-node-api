const express = require('express')
const {config} = require('./config')
const cors = require('cors')

const chatSocket = require('./sockets/chat.socket')

const userApi = require('./routes/users.routes')
const authApi = require('./routes/auth.routes')
const chatApi = require('./routes/chat.routes')
const messageApi = require('./routes/message.routes')

const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname,'public')))

app.use(cors())
app.use(express.json())

userApi(app)
authApi(app)
chatApi(app)
messageApi(app)

const server = app.listen(config.port,()=>console.log("http://localhost:"+config.port))

const SocketIO = require('socket.io')
const io = SocketIO(server)
chatSocket(io)