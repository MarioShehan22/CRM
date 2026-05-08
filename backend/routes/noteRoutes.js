const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    addNote,
    getNotesByLead,
    deleteNote,
} = require("../controllers/noteController");

const validateRequest = require("../middleware/validateRequest");

const {
    idParamValidation,
    leadIdParamValidation,
    noteValidation,
} = require("../validations/crmValidations");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/lead/:leadId",
    leadIdParamValidation,
    noteValidation,
    validateRequest,
    addNote
);

router.get(
    "/lead/:leadId",
    leadIdParamValidation,
    validateRequest,
    getNotesByLead
);

router.delete("/:id", idParamValidation, validateRequest, deleteNote);

module.exports = router;