const express = require('express');
const router = express.Router();
const eventController = require('../../controller/eventsController/eventControllers');
const { checkUserApproval } = require('../../middleware/userAuth');

router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.get('/', eventController.getAllEvents);
router.post('/register', checkUserApproval, eventController.registerEvent);
router.post('/unregister', checkUserApproval, eventController.unRegisterEvent);
router.get('/:id/:event', eventController.getUserSpecificEvents);
router.put('/cancel/:id', eventController.cancelEvent);
router.get('/getall' , eventController.getEventsForHome);

module.exports = router;
