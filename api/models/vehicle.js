const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: String,
    year: Number,
    style: String
});

module.exports = mongoose.model('Vehicle', vehicleSchema)