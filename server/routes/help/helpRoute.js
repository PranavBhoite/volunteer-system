const express = require("express");
const router = express.Router();
const helpController = require("../../controller/helpcontroller/helpcontroller");

router.get('/all', helpController.getAllHelpEvents);
router.post('/create', helpController.createHelpEvent);
router.put('/status/:id', helpController.updateHelpEventStatus);
router.get('/user/:id/:status', helpController.getUserHelpEvents);

module.exports = router;