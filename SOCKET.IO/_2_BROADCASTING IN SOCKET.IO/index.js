const express = require("express");
const path = require("path");
const {createServer}= require("node:http");
const {Server}= require("socket.io");

const app = express ();
const server = createServer(app); // BY THIS SERVER CAN USE ALL THE METHODS OF THE APP OF EXPRESS AND WORKS HTTPS 

const io = new Server(server);// BY THIS WE CAN CONNECT THE WEBSOKETS WITH THE HTTP

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));

});

var user =0 ;

//HANDLE THE WEBSOCKETS CONNECTION 

io.on("connection", (socket)=>{
    console.log("THE NEW USER IS NOW CONNECTED "+socket.id);
    user ++;

    // BROADCASTING IN THE SOCKET.IO 
    
   // 1.  // THIS METHOD IS BASICALLY USED FOR BROADCASTING MESSAGE TO ALL THE SOCKETS OR CLIENTS INCLUDING SENDER  
    // BASICALLY WE CAN SAY THAT THIS IS THE GLOBAL BROADCAST METHOD USED IN THE SOCKET.IO 

    // io.sockets.emit("broadcast",{message: `THE USERS CONNECTED IS : ${user}`});


    // 2. NOW WE SEND OR BROADCAST THE REQUIREDC MESSAGE TO THE CLIENTS EXPECT THE  SENDER OR THE USER WHICH IS CONNECTED 
       
      // THIS IS USED FOR THE NEW USER WHO IS CONNECTED IN THE SOCKETS THE MESSAGE IS SEND TO THAT USER
    socket.emit("newUser", {message: "HELLO NEW USER WELCOME TO THE COMMUNITY OF THE SOCKET.IO "});

    // THIS METHOD IS USED FOR SENDING THE MESSAGE TO THE ALREADY CONNECTED CLIENTS IN THE SOCKET 
    socket.broadcast.emit("newUser", {message : `THE NUMBER OF THE USER ARE CONNECTED IS ${user} `});



    // HANDLE THE DISCONNECTION IN THE WEBSOCKETS 
    
    socket.on("disconnect",(data)=>{
        console.log(" NOW THE USER IS DISCONNECTED"+socket.id); // BASICALLY THIS IS USED FOR HANDLING THE DISCONNECTION IN THE SOCKETS AND THE WEBSOCKETS  
    });

})

server.listen(8080, (req,res)=>{
    console.log("THE SERVER IS NOW LISTENING  AT THE PORT 8080");
})
