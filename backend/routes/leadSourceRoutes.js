const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createLeadSource,
    getAllLeadSources,
    updateLeadSource,
    deleteLeadSource,
} = require("../controllers/leadSourceController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLeadSource);
router.get("/", getAllLeadSources);
router.put("/:id", updateLeadSource);
router.delete("/:id", deleteLeadSource);

module.exports = router;