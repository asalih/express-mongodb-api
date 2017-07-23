const mongoose = require("mongoose");
var driverSchema = new mongoose.Schema({
	fullName: String,
	rate: Number,
	car: String,
	location: {
		type: { type: String },
		coordinates: []
	}
});

driverSchema.index({ "location": "2dsphere" });

var Driver = mongoose.model('Driver', driverSchema);;
module.exports = Driver;