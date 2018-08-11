const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const vehiclesRoutes = require('./api/routes/vehicles');
const ownersRoutes = require('./api/routes/owners');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/vehicles', vehiclesRoutes);
app.use('/owners', ownersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
}); 

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
