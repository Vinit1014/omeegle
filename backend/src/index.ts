import { Socket } from "socket.io";
import http from "http";
import { UserManager } from "./managers/UserManager";
import express from 'express';
import { Server } from 'socket.io';
import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const mongoClient = require('mongodb').MongoClient;
const app = express();

mongoose.connect('mongodb+srv://v1n1ts0010:pawxw7SI0lGa0WdP@cluster0.4nuzvjo.mongodb.net/Chatroom')


const chatSchema:any = {
    sender: String,
    time: Number,
    msg:String,
  };

const Chat = mongoose.model("Chat", chatSchema);

const server = http.createServer(http);

const io = new Server(server,{
    cors:{
        origin: "*"
    }
});



const userManager = new UserManager();

io.on('connection',(socket:Socket)=>{
    console.log('a user connected');

    socket.on('chatMessage',async(data)=>{
        console.log(data);
        console.log("successfully connected with mongodb");
        const chat1:any = new Chat(data)
        chat1.save();
        
    })

    userManager.addUser("randomName",socket);
    socket.on("disconnect",()=>{
        console.log("user disconnected");
        userManager.removeUser(socket.id);
    })
})      

server.listen(3000,()=>{
    console.log('listening on 3000');   
})
