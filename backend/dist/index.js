"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const UserManager_1 = require("./managers/UserManager");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoClient = require('mongodb').MongoClient;
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb+srv://v1n1ts0010:pawxw7SI0lGa0WdP@cluster0.4nuzvjo.mongodb.net/Chatroom');
const chatSchema = {
    sender: String,
    time: Number,
    msg: String,
};
const Chat = mongoose_1.default.model("Chat", chatSchema);
const server = http_1.default.createServer(http_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManager = new UserManager_1.UserManager();
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chatMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        console.log("successfully connected with mongodb");
        const chat1 = new Chat(data);
        chat1.save();
    }));
    userManager.addUser("randomName", socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        userManager.removeUser(socket.id);
    });
});
server.listen(3000, () => {
    console.log('listening on 3000');
});
