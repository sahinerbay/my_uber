const assert = require('assert');
const request = require('supertest');
const app = require('./../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
	it('POST to /api/drivers creates a new driver', done => {
		Driver.count().then((count) => {
			request(app)
				.post('/api/drivers')
				.send({ email: 'test@test.com' })
				.end(() => {
					Driver.count().then(newCount => {
						assert(count + 1 === newCount);
						done();
					})
				})
		});
	});

	it('PUT to /api/drivers/id edits an existing driver', done => {
		const driver = new Driver({ email: 't@t.com', driving: false });

		driver.save().then(() => {
			request(app)
				.put(`/api/drivers/${driver._id}`)
				.send({ driving: true })
				.end(() => {
					Driver.findById(driver._id)
						.then((driver) => {
							assert(driver.driving === true)
							done();
						})
				})
		})
	});

	it('DELETE to /api/drivers/id deletes an existing driver', done => {
		const driver = new Driver({ email: 's@s.com' });

		driver.save()
			.then(() => {
				request(app)
					.delete(`/api/drivers/${driver._id}`)
					.end(() => {
						Driver.findOne({ email: 's@s.com' })
							.then(driver => {
								assert(driver === null);
								done();
							})
					})
			})
	});

	it('GET to /api/drivers finds drivers in a location', done => {
		
		const driverA = new Driver({
			email: 'driverA@test.com',
			geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
		});

		const driverB = new Driver({
			email: 'driverB@test.com',
			geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
		});

		Promise.all([driverA.save(), driverB.save()])
			.then(() => {
				request(app)
					.get('/api/drivers?lng=-80&lat=25')
					.end((err, response) => {
						assert(response.body.length === 1);
						assert(response.body[0].obj.email === 'driverB@test.com')
						done();
					})
			})
	});
})