const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET request"
    });
});

router.post('/', (req, res, next) => {
    const vehicle = {
        brand: req.body.brand,
        year: req.body.year,
        style: req.body.style
         
    };
    res.status(201).json({
        message: "POST request",
        createVehicle: vehicle
    });
});

router.get('/:vehicleId', (req, res, next) => {
    const id = req.params.vehicleId;
    if (id === 'special'){
        res.status(200).json({
            message: 'special',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'passe ID'
        });
    }
});

router.patch('/:vehicleId', (req, res, next) => {
    res.status(200).json({
        message: 'updated vehicle'
    });
});

router.delete('/:vehicleId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted vehicle'
    });
});

module.exports = router;
