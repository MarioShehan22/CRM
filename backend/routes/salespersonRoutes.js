const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createSalesperson,
  getAllSalespersons,
  updateSalesperson,
  deleteSalesperson,
} = require("../controllers/salespersonController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSalesperson);
router.get("/", getAllSalespersons);
router.put("/:id", updateSalesperson);
router.delete("/:id", deleteSalesperson);

module.exports = router;