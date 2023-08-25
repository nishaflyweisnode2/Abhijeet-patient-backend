const express = require("express");
const router = express.Router();
const { sendMessage, getConversation } = require("../controller/chatController");


router.post("/send", sendMessage);
router.get("/conversation/:user1/:user2", getConversation);


module.exports = router;
