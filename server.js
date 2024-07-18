const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', appointmentRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
