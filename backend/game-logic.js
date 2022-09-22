let io;
let givenSocket;

let gameRunning = [];
const initGame = (sio, socket)=>{
    io = sio;
    givenSocket = socket;

    gameRunning.push(givenSocket);

    givenSocket.on("createNewGame", createNewGame);
}

const createNewGame = ()=>{
    
};