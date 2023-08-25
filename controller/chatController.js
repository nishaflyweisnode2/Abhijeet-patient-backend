const Message = require("../models/chatModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");




const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
            return res.status(400).json({ status: 400, message: "Invalid sender or receiver ID" });
        }

        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
            return res.status(409).json({ status: 409, message: "Sender and/or receiver not found" });
        }

        const newMessage = await Message.create({ sender, receiver, content });
        res.status(201).json({
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};




const getConversation = async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 },
            ],
        }).sort({ createdAt: 1 });
        res.status(200).json({
            message: "Conversation retrieved successfully",
            data: messages,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



module.exports = {
    sendMessage,
    getConversation,
};
