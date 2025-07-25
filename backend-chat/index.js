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
    'https://your-frontend-app.vercel.app',
    'https://your-frontend-app.vercel.app/',
    'https://chat-app-i4tv.vercel.app/',
    process.env.FRONTEND_URL,
    'https://*.vercel.app',
    'https://*.vercel.app/'
].filter(Boolean); // Remove undefined values

const io = new Server(server,{
   cors: {
   origin: allowedOrigins,
    credentials: true,
}
})

app.use(cors({
   origin: allowedOrigins,
    credentials: true,
}))
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
