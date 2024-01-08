const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController")

// sales api

router.post("/create",salesController.create);
router.get("/sales/total-revenue", salesController.TotalRevenue);
router.get("/sales/quantity-by-product", salesController.quantityByProduct);
router.get("/sales/top-products", salesController.topProducts);
router.get("/sales/average-price", salesController.averagePrice);
router.get("/sales/revenue-by-month", salesController.revenueByMonth);
router.get("/sales/highest-quantity", salesController.highestQuantitySold);
router.get("/sales/department-salary", salesController.departmentSalaryExpense);




module.exports = router