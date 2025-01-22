const express = require("express");
const { create } = require("node:domain");
const {createServer}= require("node:http");
const path = require("node:path");
const {Server}= require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);


app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname,"index.html"));

})

io.on("connection",(socket)=>{
    console.log("THE NEW USER IS NOW CONNECTED TO THE APPLICATION "+socket.id);


    socket.on("message",(data)=>{
       socket.broadcast.emit("message", data);
    })

    //HABDLE THE DISCONNECTION 

    socket.on("disconnect",(data)=>{
        console.log("THE USER IS NOW DISCONNECTED TO TO THE APPLICATION");
    })
});

server.listen(8080,(req,res)=>{
    console.log("THE SERVER IS NOE LISTENING AT THE PORT 8080");


} )