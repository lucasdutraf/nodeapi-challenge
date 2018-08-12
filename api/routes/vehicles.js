const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vehicle = require('../models/vehicle');

router.get('/', (req, res, next) => {
    Vehicle.find()
    .exec()
    .then(docs => {
        console.log(docs);
        // if (docs.lenght >= 0){
            res.status(200).json(docs);
        // }
        // else {
        //     res.status(404).json({
        //         message: 'No entries found'
        //     });
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(), 
        brand: req.body.brand,
        year: req.body.year,
        style: req.body.style
    });
    vehicle
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: "POST request",
            createVehicle: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:vehicleId', (req, res, next) => {
    const id = req.params.vehicleId;
    Vehicle.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({
                message: 'Not valid entry file, id do not exist'
            });
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });
});

router.patch('/:vehicleId', (req, res, next) => {
    const id = req.params.vehicleId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Vehicle.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:vehicleId', (req, res, next) => {
    const id = req.params.vehicleId;
    Vehicle.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
