const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/appointments', authenticateToken, createAppointment);
router.get('/appointments', authenticateToken, getAppointments);

module.exports = router;
