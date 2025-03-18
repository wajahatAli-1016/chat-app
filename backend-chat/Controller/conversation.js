const ConversationModel = require("../Models/conversation")

exports.addConversation = async (req, res) => {
    try {
        let senderId = req.user._id;
        let { recieverId } = req.body;

        let newConversation = new ConversationModel({
            members: [senderId, recieverId]
        })
        await newConversation.save();
        res.status(200).json({
            message: "Added Successfully",
            conversation: newConversation
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "server error" })
    }
}
exports.getConversation = async (req, res) => {
    try {
        let loggedInId = req.user._id;
        let conversations = await ConversationModel.find({
            members: { $in: [loggedInId] }
        }).populate("members","-password");
        res.status(200).json({
            message: "Fetched Successfully",
            conversations
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "server error" })
    }
}