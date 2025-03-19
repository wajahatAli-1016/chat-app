const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors'); 
const {Server} = require('socket.io')
const http = require('http');
const PORT = 8000;
const server= http.createServer(app);
const allowedOrigins = ['chat-app-i4tv.vercel.app'];
const io = new Server(server,{
    cors:{
        origin:function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], 
         credentials: true,
    }
})
const UserRoutes = require('./Routes/user');
const ConversationRoutes = require('./Routes/conversation');
const MessageRoutes = require('./Routes/message');
require('./Database/conn');  
app.use(express.json());
app.use(cookieParser());

io.on('connection',(socket)=>{
    console.log("User Connected")
   socket.on('joinConversation',(conversationId)=>{
    console.log(`User joined conversation ID of ${conversationId}`)
    socket.join(conversationId);
   })
   socket.on("sendMessage",(convId,messageDetail)=>{
    console.log('message sent',convId)
    io.to(convId).emit("recieveMessage",messageDetail)
   })

    socket.on('disconnect',()=>{
        console.log('User Disconnected')
    })
})

app.use(cors({
   origin: "https://chat-app-i4tv.vercel.app",
    credentials: true,
}))
app.options('*', cors());


app.use('/api/auth',UserRoutes);
app.use('/api/conversation',ConversationRoutes)
app.use('/api/chat',MessageRoutes);
server.listen(PORT,()=>{
    console.log("Our backend running on Port",PORT)
})
