const Driver = require('./../models/driver');

module.exports = {
	greeting(req, res) {
		res.send({hi: 'hello'})
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

		Driver.findByIdAndUpdate({_id: driverId}, driverParams)
			.then(() => Driver.findById(driverId))
			.then(driver => res.send(driver))
			.catch(next)
	}
}