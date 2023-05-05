const socket = io('http://localhost:5000')

let output = document.getElementById('output')
let mensaje = document.getElementById('mensaje')
let chat = document.getElementById('chat')
let btn = document.getElementById('enviar')


btn.addEventListener('click',function(){
    console.log(mensaje.value)
    socket.emit('writing',{
        mensaje:mensaje.value,
        chats_id:chat.value,
        sender_id:1
    })
})

socket.on(`message/${chat.value}`,function(data){
    console.log(data);
    output.innerHTML += `
    <div class="card">
        <div class="card-body">
            ${data.chats_id} - ${data.sender_id} - ${data.mensaje}
        </div>
    </div>
    `;
})
