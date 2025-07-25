const express = require('express');
const router = express.Router();
const auth=require('../Authentication/auth');
const ConversationController = require('../Controller/conversation');
router.post('/add-conversation',auth,ConversationController.addConversation)
router.get('/get-conversation',auth,ConversationController.getConversation)
router.delete('/delete-conversation/:conversationId',auth,ConversationController.deleteConversation)
module.exports = router;