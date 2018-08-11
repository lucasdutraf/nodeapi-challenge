const express = require ('express');
const app = express();

const vehiclesRoutes = require('./api/routes/vehicles');
const ownersRoutes = require('./api/routes/owners');


app.use('/vehicles', vehiclesRoutes);
app.use('/owners', ownersRoutes);



module.exports = app;
