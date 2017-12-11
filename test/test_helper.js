const mongoose = require('mongoose');
const assert = require('assert');


before(done => {
	mongoose.connect('mongodb://localhost/myuber_test', { useMongoClient: true });
	mongoose.connection	
		.once('open', ()=> done())
		.on('error', (error)=> {
			console.log(error)
		})
});

beforeEach(done=> {
	const { drivers } = mongoose.connection.collections;
	drivers.drop()
	.then(()=> drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
		.then(()=> done())
		.catch(()=> done()); //handles when we run the test first time(obviously there is no drivers at initializing stage)
})


