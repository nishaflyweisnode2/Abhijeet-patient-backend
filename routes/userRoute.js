const router = require("express").Router();
const { SignUpUser, verifyOTP, resendOTP, registrationFrom, updateProfileImage, getUserProfileById, editProfile } = require("../controller/userCtrl");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');

router.post("/signup", SignUpUser);
router.post("/verify/otp/:id", verifyOTP);
router.post("/resend/otp/:id", resendOTP);
router.put("/users/:id", authenticateUser, authorization, registrationFrom);
router.put('/update/:id/profileImage', authenticateUser, authorization, updateProfileImage);
router.get("/profile/:id", authenticateUser, getUserProfileById);
router.put("/user-id/:id", authenticateUser, authorization, editProfile);


module.exports = router;
