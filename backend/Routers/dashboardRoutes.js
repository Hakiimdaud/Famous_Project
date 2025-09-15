const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controller/dashboardController");

router.get("/dashboard/stats", getDashboardStats);

module.exports = router;
