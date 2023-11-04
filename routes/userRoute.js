const router = require("express").Router();
const { SignUpUser, verifyOTP, resendOTP, registrationFrom, updateProfileImage, getAllUsers, getUserProfileById, editProfile, setActiveTreatments, getDoctorsByActiveTreatments } = require("../controller/userCtrl");


const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');

router.post("/signup", SignUpUser);
router.post("/verify/otp", verifyOTP);
router.post("/resend/otp/:id", resendOTP);
router.put("/users/:id", authenticateUser, authorization, registrationFrom);
router.put('/update/:id/profileImage', authenticateUser, authorization, updateProfileImage);
router.get("/users",  authenticateUser, getAllUsers);
router.get("/profile/:id", authenticateUser, authorization, getUserProfileById);
router.put("/user-id/:id", authenticateUser, authorization, editProfile);
router.post("/users/:id/active-treatments", authenticateUser, authorization, setActiveTreatments);
router.get("/users/activeTreatments", authenticateUser, getDoctorsByActiveTreatments);



module.exports = router;
