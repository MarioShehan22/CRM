const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    addNote,
    getNotesByLead,
    deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.use(authMiddleware);

router.post("/lead/:leadId", addNote);
router.get("/lead/:leadId", getNotesByLead);
router.delete("/:id", deleteNote);

module.exports = router;