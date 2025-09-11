const express = require("express")
const famousController = require("../controller/famousControl")
const uploadImage = require("../middleware/uploadphoto")


const router = express.Router()

router.post("/create/famous", uploadImage.single("img"), famousController.createFamous)

// get
router.get("/read/famous", famousController.readfamous)

// readsingledata
router.get("/readSingle/famous/:id",famousController.readSinglefamous)

// updateProduct

router.put("/update/famous/:id",uploadImage.single("img"),famousController.updateFamous)

// deleteProduct
router.delete("/delete/famous/:id",famousController.deleteFamous)

module.exports = router
