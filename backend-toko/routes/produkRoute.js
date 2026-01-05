const express = require("express");
const router = express.Router();
const controller = require("../controllers/produkController");
const { validateProduk } = require("../middlewares/validate");

router.get("/", controller.getProduk);
router.post("/", validateProduk, controller.createProduk);
router.put("/:id", validateProduk, controller.updateProduk);
router.delete("/:id", controller.deleteProduk);

module.exports = router;
