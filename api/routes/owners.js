const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET owners request"
    });
});

router.post('/', (req, res, next) => {
    const owner = {
        name: req.body.name,
        vehicleId: req.body.vehicleId,
        email: req.body.email
    }
    res.status(201).json({
        message: "POST owners request",
        owner: owner
});

router.get('/:ownerId', (req, res, next) => {
    res.status(200).json({
        message: "owners details",
        ownerId: req.params.ownerId
    });
});

router.delete('/:ownerId', (req, res, next) => {
    res.status(200).json({
        message: "owner deleted",
        ownerId: req.params.ownerId
    });
});

router.patch('/:ownerId', (req, res, next) => {
    res.status(200).json({
        message: "owner updated",
        ownerId: req.params.ownerId
    });
});

module.exports = router;
