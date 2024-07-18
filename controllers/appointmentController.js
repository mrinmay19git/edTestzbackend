const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  const { date, description } = req.body;
  const userId = req.user.userId;
  
  await Appointment.create({ date, description, userId });

  res.status(201).send('Appointment created successfully');
};

const getAppointments = async (req, res) => {
  const userId = req.user.userId;

  const appointments = await Appointment.findAll({ where: { userId } });

  res.send(appointments);
};

module.exports = { createAppointment, getAppointments };
