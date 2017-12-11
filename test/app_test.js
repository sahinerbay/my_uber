const assert = require('assert');
const request = require('supertest');
const app = require('./../app');

describe('The express app', () => {
	it('handles a GET request to /api', (done) => {
		request(app)
			.get('/api')
			.end(function (err, res) {
				if (err) throw err;

				assert(res.body.hi === 'hello')
				done();
			});
	})
})