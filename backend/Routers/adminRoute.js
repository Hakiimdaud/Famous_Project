const express = require("express")
const router = express.Router()
const adminController = require("../controller/adminController")

router.post("/create/admin", adminController.createAdmin)
router.post("/login/admin", adminController.adminLogin)



module.exports = router