const express = require('express');
const { logVolunteerTime, getVolunteerLogs } = require('../controllers/volunteerLogsController');
const router = express.Router();

router.post('/', logVolunteerTime);     // Log volunteer time
router.get('/', getVolunteerLogs);      // Retrieve all logs

module.exports = router;
