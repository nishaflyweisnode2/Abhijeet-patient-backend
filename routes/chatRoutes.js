const express = require("express");
const router = express.Router();
const { sendMessage, getConversation } = require("../controller/chatController");


const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');




router.post("/send", authenticateUser, sendMessage);
router.get("/conversation/:user1/:user2", authenticateUser, getConversation);


module.exports = router;
