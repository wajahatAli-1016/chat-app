const express = require('express');
const router = express.Router();
const auth = require('../Authentication/auth');
const MessageController = require('../Controller/message');

router.post('/post-message-chat',auth,MessageController.sendMessage);
router.get('/get-message-chat/:convId',auth,MessageController.getMessage)
module.exports = router;