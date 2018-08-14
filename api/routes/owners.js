const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Owner = require("../models/owner");
const Vehicle = require("../models/vehicle");

// Handle incoming GET requests to /owners
router.get("/", (req, res, next) => {
  Owner.find()
    .select("vehicle name email _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        owners: docs.map(doc => {
          return {
            _id: doc._id,
            vehicle: doc.vehicle,
            name: doc.name,
            email: doc.email,
            request: {
              type: "GET",
              url: "http://localhost:3000/owners/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Vehicle.findById(req.body.vehicleId)
    .then(vehicle => {
      if (!vehicle) {
        return res.status(404).json({
          message: "Vehicle not found"
        });
      }
      const owner = new Owner({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        vehicle: req.body.vehicleId,
        email: req.body.name
      });
      return owner.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Owner stored",
        createdOwner: {
          _id: result._id,
          vehicle: result.vehicle,
          name: result.name,
          email: result.email,
        },
        request: {
          type: "POST",
          url: "http://localhost:3000/owners/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:ownerId", (req, res, next) => {
  Owner.findById(req.params.ownerId)
    .exec()
    .then(owner => {
      if (!owner) {
        return res.status(404).json({
          message: "Owner not found"
        });
      }
      res.status(200).json({
        owner: owner,
        request: {
          type: "GET",
          url: "http://localhost:3000/owners"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:ownerId", (req, res, next) => {
  Owner.remove({ _id: req.params.ownerId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Owner deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/owners",
          body: { vehicleId: "ID", brand: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
