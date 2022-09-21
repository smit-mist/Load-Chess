import React from 'react'
import {io} from "socket.io-client";
const socket= io('http://localhost:5000');

const Play = () => {
    socket.on('connect',()=>{
        console.log("Connected with", socket.id);
    });
  return (
    <div>Play</div>
  )
}

export default Play