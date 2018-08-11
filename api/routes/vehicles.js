const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET request"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "POST request"
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


module.exports = router;