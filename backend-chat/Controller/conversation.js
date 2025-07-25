const ConversationModel = require("../Models/conversation")
const MessageModel = require("../Models/message")

exports.addConversation = async (req, res) => {
    try {
        let senderId = req.user._id;
        let { recieverId } = req.body;

        // Check if conversation already exists between these two users
        const existingConversation = await ConversationModel.findOne({
            members: { $all: [senderId, recieverId] }
        });

        if (existingConversation) {
            // If conversation exists, return it without creating a new one
            return res.status(200).json({
                message: "Conversation already exists",
                conversation: existingConversation
            });
        }

        // If no conversation exists, create a new one
        let newConversation = new ConversationModel({
            members: [senderId, recieverId]
        });
        await newConversation.save();
        
        res.status(200).json({
            message: "Added Successfully",
            conversation: newConversation
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}
exports.getConversation = async (req, res) => {
    try {
        let loggedInId = req.user._id;
        let conversations = await ConversationModel.find({
            members: { $in: [loggedInId] }
        }).populate("members","-password");
        
        // Get the last message for each conversation
        const conversationsWithLastMessage = await Promise.all(
            conversations.map(async (conversation) => {
                const lastMessage = await MessageModel.findOne({
                    conversation: conversation._id
                })
                .sort({ createdAt: -1 })
                .populate('sender', 'name profilePic');
                
                return {
                    ...conversation.toObject(),
                    lastMessage: lastMessage
                };
            })
        );
        
        res.status(200).json({
            message: "Fetched Successfully",
            conversations: conversationsWithLastMessage
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "server error" })
    }
}

exports.deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id;

        // Check if the conversation exists and user is a member
        const conversation = await ConversationModel.findOne({
            _id: conversationId,
            members: { $in: [userId] }
        });

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found or access denied" });
        }

        // Delete all messages in this conversation
        await MessageModel.deleteMany({ conversation: conversationId });

        // Delete the conversation
        await ConversationModel.findByIdAndDelete(conversationId);

        res.status(200).json({
            message: "Conversation deleted successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}