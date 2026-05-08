const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createLeadSource,
    getAllLeadSources,
    updateLeadSource,
    deleteLeadSource,
} = require("../controllers/leadSourceController");

const validateRequest = require("../middleware/validateRequest");

const {
    idParamValidation,
    leadSourceValidation,
} = require("../validations/crmValidations");

const router = express.Router();

router.use(authMiddleware);

router.post("/", leadSourceValidation, validateRequest, createLeadSource);
router.get("/", getAllLeadSources);
router.put(
    "/:id",
    idParamValidation,
    leadSourceValidation,
    validateRequest,
    updateLeadSource
);
router.delete("/:id", idParamValidation, validateRequest, deleteLeadSource);

module.exports = router;