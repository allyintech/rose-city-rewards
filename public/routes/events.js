const express = require('express');
const { createEvent, listEvents, updateEvent, deleteEvent } = require('../controllers/eventsController');
const router = express.Router();

router.post('/', createEvent);          // Create an event
router.get('/', listEvents);            // List all events
router.put('/:id', updateEvent);        // Update an event
router.delete('/:id', deleteEvent);     // Delete an event

module.exports = router;
