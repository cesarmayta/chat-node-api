
const chatSocket = (io) =>{
    const chatIo = io
    chatIo.on('connection',(socket)=>{
        console.log('sala seleccionada',socket.id)

        socket.on('writing',(data)=>{
            console.log('user writing',data)
            chatIo.emit(`message/${data.chats_id}`,data)
        })
    })
}

module.exports = chatSocket