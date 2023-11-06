const { check, body } = require('express-validator');
const { param } = require('express-validator');


const validateMobile = check('mobile')
    .notEmpty().withMessage('Mobile number is required')
    .isMobilePhone('en-IN').withMessage('Invalid mobile number format');


const validateOTP = body('otp')
    .isNumeric()
    .isLength({ min: 4, max: 4 })
    .withMessage('Invalid OTP format. Must be a 4-digit number');


const validateUserId = param('id')
    .isMongoId()
    .withMessage('Invalid user ID format');


const validateRegistrationForm = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    body('mobile')
        .notEmpty()
        .withMessage('Mobile number is required')
        .isMobilePhone('en-IN').withMessage('Invalid mobile number format')
        .isMobilePhone('any', { strictMode: false })
        .withMessage('Invalid mobile number format'),

    body('dateOfBirth')
        .optional()
        .isDate()
        .withMessage('Invalid date format'),
    // .custom((value) => {
    //     // Add custom validation for the dateOfBirth field (e.g., validate age)
    //     const birthDate = new Date(value);
    //     const currentDate = new Date();
    //     const age = currentDate.getFullYear() - birthDate.getFullYear();
    //     if (age < 18) {
    //         throw new Error('You must be at least 18 years old.');
    //     }
    //     return true;
    // }),

    body('city')
        .isString()
        .isLength({ min: 4, max: 50 })
        .withMessage('Invalid city format. Must be a 4-50 character string')
        .notEmpty()
        .withMessage('City is required')
        .isString()
        .withMessage('City must be a string'),

    body('pincode')
        .notEmpty()
        .withMessage('Pincode is required')
        .isPostalCode('IN')
        .withMessage('Invalid Indian pincode format'),
];





module.exports = {
    validateMobile,
    validateUserId,
    validateOTP,
    validateRegistrationForm
};
