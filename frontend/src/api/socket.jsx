import io from 'socket.io-client';

const url = "http://localhost:5000";

const socket = io(url);

let mySocketId;

socket.on("connection", client=>{
    mySocketId = client.id;
    console.log(mySocketId, "INSIDE API");
})
export{
    socket, mySocketId
}