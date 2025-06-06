const express = require('express');
const router = express.Router();
const eventController = require('../../controller/eventsController/eventControllers');

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
