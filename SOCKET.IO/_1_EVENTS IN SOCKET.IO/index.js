const express = require("express");
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));

})

//HANDLE THE SOCKET.IO CONNECTIONS 

io.on("connection", (socket) => {
    console.log("THE NEW SOCKET IS NOW CONNECTED " + socket.id);

    // PRERESERVED EVENT 
    // 1. CONNECTION EVENT 
    // 2. DISCONNECT EVENT 
    // 3. RECONNECT EVENT 
    // 4. PING EVENT 
    // 5. JOIN EVENT 
    // 6. LEAVE EVENT 
    // 7. MESSAGE EVENT 

    // INBUILT SEND FUNCTION OF THE SOCKET.IO  PRESERVED MESSAGE EVENT CALLED BY THIS FUNCTION   

    setTimeout(() => {
        socket.send("THE MESSAGE IS GENERATED BY THE SOCKET BY PRERESERVED MESSAGE FUNCTION OF SOCKET IO ")
    }, 3000)


    //HANDLE THE DISCONNECTION OF THE SOCKETS IN WEBSOCKETS 

    socket.on("disconnect", () => {

        console.log('NOW THE SOCKET IS DISCONNECTED ');


    });


    // CUSTOM EVENTS 

    // 1. MESSAGE AND THE CUSTOM EVENTS IS EMITTED BY THE SERVER SIDE AND LISTENING BY THE CLIENT SIDE 

    socket.emit("custom", { message: "THIS IS THE CUSTOM MESSAGE FROM THE SERVER SIDE " })

    // 2. MESSAGE AND THE CUSTOM EVENTS IS EMITTED BY THE CLIENT SIDE AND THEN LISTENING BY THE SERVER SIDE. 
    socket.on("customEvent", (data) => {
        console.log(data);
        console.log(data.message);

        // RESEND THE MESSAGE EMITTED BY THE CLIENT SIDE 

        socket.emit("customEventRes",{message: `${data.message}`})
    })


})

server.listen(8080, (req, res) => {
    console.log("NOW THE SERVER IS LISTENING AT THE 8080 PORT ")
})
