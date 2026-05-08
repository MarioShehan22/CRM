const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    updateLeadStatus,
    deleteLead,
} = require("../controllers/leadController");
const validateRequest = require("../middleware/validateRequest");

const {
    idParamValidation,
    leadValidation,
    leadStatusUpdateValidation,
} = require("../validations/crmValidations");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllLeads);
router.post("/", leadValidation, validateRequest, createLead);
router.get("/:id", idParamValidation, validateRequest, getLeadById);
router.put("/:id", idParamValidation, leadValidation, validateRequest, updateLead);
router.patch("/:id/status", idParamValidation, leadStatusUpdateValidation, validateRequest, updateLeadStatus);
router.delete("/:id", idParamValidation, validateRequest, deleteLead);

module.exports = router;