const express = require ('express');
const app = express();

const vehiclesRoutes = require('./api/routes/vehicles');

app.use('/vehicles', vehiclesRoutes);


module.exports = app;
