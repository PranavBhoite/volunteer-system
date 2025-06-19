const express = require('express');
const router = express.Router();
const eventController = require('../../controller/eventsController/eventControllers');

router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.get('/', eventController.getAllEvents);
router.post('/register', eventController.registerEvent);
router.post('/unregister', eventController.unRegisterEvent);
router.get('/:id/:event', eventController.getUserSpecificEvents);
router.put('/cancel/:id', eventController.cancelEvent);

module.exports = router;
