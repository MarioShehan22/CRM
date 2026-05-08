const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createLeadStatus,
    getAllLeadStatuses,
    updateLeadStatus,
    deleteLeadStatus,
} = require("../controllers/leadStatusController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLeadStatus);
router.get("/", getAllLeadStatuses);
router.put("/:id", updateLeadStatus);
router.delete("/:id", deleteLeadStatus);

module.exports = router;