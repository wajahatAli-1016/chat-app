require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors'); 
const {Server} = require('socket.io')
const http = require('http');
const PORT = process.env.PORT || 8000;
const server= http.createServer(app);
// CORS configuration for both development and production
const allowedOrigins = [
    'http://localhost:3000',
   'https://chat-app-oscz.vercel.app'
].filter(Boolean); // Remove undefined values

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }
});


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

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


app.options('*', cors());


app.use('/api/auth',UserRoutes);
app.use('/api/conversation',ConversationRoutes)
app.use('/api/chat',MessageRoutes);
server.listen(PORT,()=>{
    console.log("Our backend running on Port",PORT)
})
