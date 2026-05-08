const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createSalesperson,
  getAllSalespersons,
  updateSalesperson,
  deleteSalesperson,
} = require("../controllers/salespersonController");

const validateRequest = require("../middleware/validateRequest");

const {
  idParamValidation,
  salespersonValidation,
} = require("../validations/crmValidations");

const router = express.Router();

router.use(authMiddleware);

router.post("/", salespersonValidation, validateRequest, createSalesperson);
router.get("/", getAllSalespersons);
router.put(
    "/:id",
    idParamValidation,
    salespersonValidation,
    validateRequest,
    updateSalesperson
);
router.delete("/:id", idParamValidation, validateRequest, deleteSalesperson);

module.exports = router;