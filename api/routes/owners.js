const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET owners request"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "POST owners request"
    });
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
