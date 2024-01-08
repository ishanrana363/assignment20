const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController")

// sales api

router.post("/create",salesController.create);
router.get("/sales/total-revenue", salesController.TotalRevenue)

module.exports = router