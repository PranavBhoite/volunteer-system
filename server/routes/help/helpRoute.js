const express = require("express");
const router = express.Router();
const helpController = require("../../controller/helpcontroller/helpcontroller");
const eventController = require("../../controller/eventsController/eventControllers");
const { checkUserApproval } = require('../../middleware/userAuth');

router.get('/all', helpController.getAllHelpEvents);
router.post('/create', checkUserApproval, helpController.createHelpEvent);
router.put('/update/:id', checkUserApproval, helpController.updateEventFromUserSide);
router.put('/cancel/:id', checkUserApproval, eventController.cancelEvent);
router.put('/status/:id', helpController.updateHelpEventStatusFromAdminSide);
router.get('/user/:id/:status', helpController.getUserHelpEvents);

module.exports = router;