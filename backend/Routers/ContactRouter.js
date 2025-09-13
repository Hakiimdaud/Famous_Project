const express = require("express");
const cotrol_Contact = require("../controller/ContactControl");

const router = express.Router();

router.post("/create/CONTACT", cotrol_Contact.create_Post_Contact)
router.get("/read/CONTACT", cotrol_Contact.read_post_Contact)
router.get("/readSingle/CONTACT/:id", cotrol_Contact.readSingle_Contact)
router.put("/update/CONTACT/:id", cotrol_Contact.update_Post_Contact)
router.put("/delete/CONTACT/:id", cotrol_Contact.delede_Post_Contact)

module.exports = router