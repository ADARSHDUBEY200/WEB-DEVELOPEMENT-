const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log("THE NEW USER IS NOW CONNECTED " + socket.id);

    // BASICALLY WHEN WE ARE GOING TO LEARN ABOUT THE ROOMS IN THE SOCKET.IO 
    // IT IS BASICALLY A SEPARATE CHANNEL WHERE WE CAN GROUP SOME SOCKETS TOGETHER AND MAKE THEM MESSAGING TO EACH OTHER 
    // 1. FOR JOINING THE ROOM "JOIN" METHOD IN THE SOCKET.IO
    // 2. FOR LEAVING THE ROOM "LEAVE" METHOD IN THE SOCKET.IO 
    // 3. FOR BROADCASTING THE MESSAGE TO THE SOCKETS IN THE ROOM WE USE "TO" AND "IN"

    // BY DEFAULT WE JOIN A SPECIFIC ROOM BUT DEVELOPER CAN MAKE THE CUSTOM ROOMS FOR PRIVACY 


    //JOIN THE ROOM 
    socket.on("joinroom", (room) => {

        // FOR JOIN THE ROOM FOR THE SOCKET 
        socket.join(room);

        console.log(`NEW SOCKET IS NOW JOINED THE ROOM THE SOCKET ID IS ${socket.id} AND ROOM IS ${room}`);

        // WE WANT TO SEND MESSAGE TO ALL THE CLIENTS EXCEPT THE SENDER 
        socket.to(room).emit("message", { msg: `THE NEW USER IS JOINED THE ROOM ${room} WITH THE SOCKET ID ${socket.id}` });
    });

    // lEAVE THE ROOM 
    socket.on("leaveroom", (room) => {
        socket.leave(room);

        console.log(`THE USER IS LEAVE THE ROOM WITH THE SOCKET ID IS ${socket.id}`);

        socket.to(room).emit("message", { msg: `THE USER IS LEAVE THE ROOM WITH THE SOCKET ID ${socket.id}` });

    })

    // SEND THE MESSAGE TO THE SPECIFIC ROOM 
    socket.on("sendtoRoom", ({ room, message }) => {
        socket.to(room).emit("message", { msg: `THE USER IS IN THE ROOM WITH THE SOCKET ID ${socket.id}` });
    })


    // HANDLE THE DISCONNECTION IN THE SOCKETS 
    socket.on("disconnect", (data) => {
        console.log("THE USER IS NOW DISCONNECTED " + socket.id);

    })
})

server.listen(8080,(req,res)=>{
    console.log("THE SERVER IS LISTENING AT THE PORT 8080");

})