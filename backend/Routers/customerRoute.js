const express = require("express")
const router = express.Router()
const customerController = require("../controller/customerController")
const {  verifyToken, isAdmin } = require("../middleware/Auth")
const uploadImage = require("../middleware/uploadphoto")


router.post("/create/customer", uploadImage.single("img"), customerController.createCustomer)
router.post("/login/customer", customerController.customerLogin)
router.get("/read/customer", verifyToken, isAdmin, customerController.readCustomer)
router.get("/readSingle/customer/:id", customerController.readSingleCustomer)
router.put("/update/customer/:id", uploadImage.single("img"), customerController.updateCustomer)
router.delete("/delete/customer/:id", customerController.deleteCustomer)

module.exports = router