const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createLeadStatus,
    getAllLeadStatuses,
    updateLeadStatus,
    deleteLeadStatus,
} = require("../controllers/leadStatusController");

const validateRequest = require("../middleware/validateRequest");

const {
    idParamValidation,
    leadStatusValidation,
} = require("../validations/crmValidations");

const router = express.Router();

router.use(authMiddleware);

router.post("/", leadStatusValidation, validateRequest, createLeadStatus);
router.get("/", getAllLeadStatuses);
router.put(
    "/:id",
    idParamValidation,
    leadStatusValidation,
    validateRequest,
    updateLeadStatus
);
router.delete("/:id", idParamValidation, validateRequest, deleteLeadStatus);

module.exports = router;