const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vehicle = require("../models/vehicle");

router.get("/", (req, res, next) => {
  Vehicle.find()
    .select("brand year style _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        vehicles: docs.map(doc => {
          return {
            brand: doc.brand,
            year: doc.year,
            style: doc.style,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/vehicles/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const vehicle = new Vehicle({
    _id: new mongoose.Types.ObjectId(),
    brand: req.body.brand,
    year: req.body.year,
    style: req.body.style
  });
  vehicle
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created vehicle successfully",
        createdVehicle: {
            brand: result.brand,
            year: result.year,
            style:result.style,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/vehicles/" + result._id
            }
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

router.get("/:vehicleId", (req, res, next) => {
  const id = req.params.vehicleId;
  Vehicle.findById(id)
    .select('brand year style _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            vehicle: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/vehicles'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:vehicleId", (req, res, next) => {
  const id = req.params.vehicleId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Vehicle.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Vehicle updated',
          request: {
              type: 'PATCH',
              url: 'http://localhost:3000/vehicles/' + id
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

router.delete("/:vehicleId", (req, res, next) => {
  const id = req.params.vehicleId;
  Vehicle.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Vehicle deleted',
          request: {
              type: 'DELETE',
              url: 'http://localhost:3000/vehicles',
              body: { brand: 'String', year: 'Number', style: 'String'}
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

module.exports = router;
