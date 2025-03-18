const MessageModel = require('../Models/message');


exports.sendMessage = async (req,res)=>{
    try{
    let {conversation, content} = req.body;
    let addMessage = new MessageModel({sender:req.user._id,conversation,message:content});
    await addMessage.save();
    let populatedMessage = await addMessage.populate('sender');
    res.status(201).json(populatedMessage);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "server error" })
    }
}
exports.getMessage = async(req,res)=>{
    try{
        let {convId} = req.params;
         let message = await MessageModel.find({
            conversation:convId
         }).populate("sender")
         res.status(200).json({message:"Fetched Message Successfully", message})
        }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "server error" })
    }
}