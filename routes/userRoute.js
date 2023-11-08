const router = require("express").Router();
const { SignUpUser, verifyOTP, resendOTP, /*login,*/ registrationFrom, updateProfileImage, getAllUsers, getUserProfileById, editProfile, setActiveTreatments, getDoctorsByActiveTreatments } = require("../controller/userCtrl");

const { validateMobile, validateOTP, validateUserId, validateRegistrationForm } = require('../validation/validation')

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');


router.post("/signup", [validateMobile], SignUpUser);
router.post("/verify/otp/:id", [validateOTP], verifyOTP);
router.post("/resend/otp", [validateMobile], resendOTP);
// router.post('/login', [validateMobile, validateOTP], login);
router.put("/users/:id", authenticateUser, authorization, [validateUserId, validateRegistrationForm], registrationFrom);
router.put('/update/:id/profileImage', authenticateUser, authorization, updateProfileImage);
router.get("/users", authenticateUser, getAllUsers);
router.get("/profile/:id", authenticateUser, authorization, getUserProfileById);
router.put("/user-id/:id", authenticateUser, authorization, editProfile);
router.post("/users/:id/active-treatments", authenticateUser, authorization, setActiveTreatments);
router.get("/users/activeTreatments", authenticateUser, getDoctorsByActiveTreatments);



module.exports = router;
