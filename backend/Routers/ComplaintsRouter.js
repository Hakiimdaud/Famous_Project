const express = require('express');
const  ComplaintsController  = require('../controller/ComplaintsController');

const router = express.Router();
// create a complaint
router.post('/post/complaints', ComplaintsController.createComplaint);

// get all complaints
router.get('/get/complaints', ComplaintsController.getAllComplaints);

// get single complaint by ID
router.get('/get/complaints/:id', ComplaintsController.getComplaintById);
// update complaint by ID (optional, not in routes)
router.put('/update/complaints/:id', ComplaintsController.updateComplaintById);

// delete complaint by ID
router.delete('/delete/complaints/:id', ComplaintsController.deleteComplaintById);

module.exports = router;
