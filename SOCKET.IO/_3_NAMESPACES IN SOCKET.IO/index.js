const express = require("express");
const {createServer} = require("node: http");
const {Server} = require ("socket.io");
const path = require("path");


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));

});

// HANDLE THE WEBSOCKETS CONECTION 

io.on("connection",(socket)=>{
    console.log("THE NEW USER IS NOW CONNECTED TO THE SOCKET "+socket.id);

    // HANDLE THE DISCONNECTION OF THE USER 

    socket.on("disconnect",()=>{
        console.log("THE USER IS NOW DISCONNECTED FROM THE SOCKET "+socket.id);
    });
});

server.listen(8080,(req,res)=>{
    console.log("THE server id noe listening at the port 8080");

});