const express = require('express');
const app = express();
const Test = require('./mongoose.js');



//create test data 
var rick = new Test({
	name: 'Rick',
	alive: 1,
	location: 'Orlando, FL',
	hobbies: ['coding', 'music', 'traveling'],
	meta: {
		age: 33,
		website: 'https://www.google.com'
	}
});

//call the custom method
rick.caps(function(err, name){
	if (err) throw err;
	console.log(name);
});


//call the built-in save method to save rick to the database
rick.save(function(err){
	if (err) throw err;

	console.log('Added to database successfully!');
});




//route
app.get('/', function(req, res){
	Test.find({}, function(err, data){
		if (err) throw err;
		console.log(data);
		res.json(data);
	});

});


//server
app.listen(8080, function(){
	console.log("listening http://localhost:8080");
});