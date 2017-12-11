const DriversController = require('./../controllers/drivers_controller');

module.exports = (app) => {
	app.get('/api', DriversController.greeting);

	app.post('/api/drivers', DriversController.create);
	app.put('/api/drivers/:id', DriversController.edit);
}