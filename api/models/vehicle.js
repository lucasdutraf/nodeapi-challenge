const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: { type: String, required: true},
    year: { type: Number, required: true},
    style: { type: String, required: true}
});

module.exports = mongoose.model('Vehicle', vehicleSchema)