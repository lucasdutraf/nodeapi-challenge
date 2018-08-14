const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    name: { type: String, required:true },
    email: {type: String, required: true}
});

module.exports = mongoose.model('Owner', ownerSchema);
