const express = require("express")
const router = express.Router()
const adminController = require("../controller/adminController")
const uploadImage = require("../middleware/uploadphoto")
 
router.post("/create/admin", uploadImage.single("img"), adminController.createAdmin)
router.post("/login/admin", adminController.adminLogin)
router.get("/read/admin", adminController.getAdmins)
router.get("/readSingle/admin/:id", adminController.getSingleAdmin)
router.put("/update/admin/:id", uploadImage.single("img"), adminController.updateAdmin)
router.delete("/delete/admin/:id", adminController.deleteAdmin)



module.exports = router