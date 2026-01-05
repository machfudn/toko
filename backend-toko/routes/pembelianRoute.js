const express = require("express");
const router = express.Router();
const controller = require("../controllers/pembelianController");
const { validatePembelian } = require("../middlewares/validate");

router.get("/", controller.getPembelian);
router.post("/", validatePembelian, controller.createPembelian);
router.post("/cancel/:id", controller.cancelPembelian);

module.exports = router;
