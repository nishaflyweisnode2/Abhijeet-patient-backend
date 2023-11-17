const express = require("express");
const router = express.Router();
const { sendMessage, getConversation } = require("../controller/doctorChatController");


const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');




router.post("/doctor/send", authenticateUser, sendMessage);
router.get("/doctor/conversation/:user1/:user2", authenticateUser, getConversation);


module.exports = router;
