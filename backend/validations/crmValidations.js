const { body, param } = require("express-validator");

const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

const leadValidation = [
    body("leadName")
        .trim()
        .notEmpty()
        .withMessage("Lead name is required")
        .isLength({ min: 2 })
        .withMessage("Lead name must be at least 2 characters"),

    body("email")
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage("Enter a valid email"),

    body("phoneNumber")
        .optional({ checkFalsy: true })
        .isLength({ min: 9 })
        .withMessage("Phone number must be at least 9 characters"),

    body("leadSourceId")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("Lead source ID must be valid"),

    body("salespersonId")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("Salesperson ID must be valid"),

    body("statusId")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("Status ID must be valid"),

    body("estimatedDealValue")
        .optional({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage("Estimated deal value cannot be negative"),
];

const leadStatusUpdateValidation = [
    body("statusId")
        .notEmpty()
        .withMessage("Status ID is required")
        .isInt({ min: 1 })
        .withMessage("Status ID must be valid"),
];

const leadSourceValidation = [
    body("sourceName")
        .trim()
        .notEmpty()
        .withMessage("Source name is required")
        .isLength({ min: 2 })
        .withMessage("Source name must be at least 2 characters"),
];

const leadStatusValidation = [
    body("statusName")
        .trim()
        .notEmpty()
        .withMessage("Status name is required")
        .isLength({ min: 2 })
        .withMessage("Status name must be at least 2 characters"),

    body("orderIndex")
        .notEmpty()
        .withMessage("Order index is required")
        .isInt({ min: 1 })
        .withMessage("Order index must be greater than 0"),
];

const noteValidation = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Note content is required")
        .isLength({ min: 5 })
        .withMessage("Note content must be at least 5 characters"),
];

const salespersonValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("phoneNumber")
        .optional({ checkFalsy: true })
        .isLength({ min: 9 })
        .withMessage("Phone number must be at least 9 characters"),
];

const idParamValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid ID"),
];

const leadIdParamValidation = [
    param("leadId")
        .isInt({ min: 1 })
        .withMessage("Invalid lead ID"),
];

module.exports = {
    loginValidation,
    leadValidation,
    leadStatusUpdateValidation,
    leadSourceValidation,
    leadStatusValidation,
    noteValidation,
    salespersonValidation,
    idParamValidation,
    leadIdParamValidation,
};