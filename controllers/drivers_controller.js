const Driver = require('./../models/driver');

module.exports = {
	greeting(req, res) {
		res.send({ hi: 'hello' })
	},

	index(req, res, next) {
		const {lng, lat} = req.query

		Driver.geoNear(
			{
				type: 'Point',
				coordinates: [parseFloat(lng), parseFloat(lat)]
			},
			{
				spherical: true,
				maxDistance: 200000
			}
		).then(drivers=> res.send(drivers))
		.catch(next)
	},

	create(req, res, next) {
		const driverProps = req.body;

		Driver.create(driverProps)
			.then(driver => res.send(driver))
			.catch(next)

	},

	edit(req, res, next) {
		const driverId = req.params.id;
		const driverParams = req.body;

		Driver.findByIdAndUpdate({ _id: driverId }, driverParams)
			.then(() => Driver.findById(driverId))
			.then(driver => res.send(driver))
			.catch(next)
	},

	delete(req, res, next) {
		const driverId = req.params.id;
		const driverProps = req.body;

		Driver.findByIdAndRemove(driverId)
			.then(driver => res.status(204).send(driver))
			.catch(next)
	}
}