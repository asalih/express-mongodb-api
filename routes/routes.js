const express = require('express');
const mongoose = require("mongoose");
var router = express.Router();

const config = require('../helpers/config');
const validate = require("../helpers/validate")
let Driver = require("../models/driver");

router.get('/', function (req, res) {
	res.send({ status: "on" });
})

router.post("/ride", (req, res) => {

	if (validate.isUndefined(req.body.coordinates) ||
		validate.isNot(req.body.coordinates.length, 2)) {
		return res.send(400, { error: "send coordinates." });
	}

	Driver.aggregate(
    [
        {
        	$geoNear: {
        		near: {
        			type: "Point",
        			coordinates: [req.body.coordinates[0], req.body.coordinates[1]]
        		},
        		distanceField: "distance",
        		spherical: true,
        		maxDistance: req.body.maxDistance || config.settings.defaultMaxDistance
        	}
        }
    ]).limit(config.settings.defaultNearDriverCount).exec((err, drivers) => {
    	if (err) throw err;
    	res.send(drivers);
    })
});

router.get('/drivers/:page(\\d+)?', (req, res) => {
	Driver.count({}).then((cnt) => {
		let limit = config.settings.defaultResultLimit;
		let page = !isNaN(req.params.page) ? req.params.page : 0
		var skip = page * limit;

		Driver.find({}).limit(limit).skip(skip).exec((err, drivers) => {
			res.send({
				hasNextPage: cnt > skip,
				drivers: drivers
			});
		});
	});

});

/* Creates driver */
router.post('/driver', (req, res) => {
	if (validate.isUndefined(req.body.location) ||
		validate.isUndefined(req.body.location.coordinates) ||
		validate.isNot(req.body.location.coordinates.length, 2)) {
		return res.status(400).send({ error: "send coordinates." });
	}
	Driver.create(req.body, (err, ref) => {
		if (err) throw err;
		res.send(ref);
	});
});
router.route('/driver/:id')
	.all((req, res, next) => {
		//checks Object Id
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.send(400, { error: "invalid ObjectId" }); // Invalid ObjectId
		}
		else {
			next();
		}
	})
	.get((req, res) => {
		Driver.findById(req.params.id).exec((err, item) => {
			if (err) throw err;
			res.send(item);
		});
	})
	.put((req, res) => {
		Driver.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, item) => {
			if (err) throw err;
			res.send(item);
		});
	})
	.delete((req, res) => {
		Driver.deleteOne({ _id: req.params.id }).exec((err, item) => {
			if (err) throw err;
			res.send({ done: true });
		});
	});

module.exports = router;
