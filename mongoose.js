//grab package in project
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect to MongoDB database
mongoose.connect('mongodb://localhost/mongooseTestDB');

//create a schema
var testSchema = new Schema({
	name: String/*{type: String, required: true, unique: true}*/,
	alive: Boolean,
	location: String,
	hobbies: Array,
	meta: {
		age: Number,
		website: String
	}, 
	created_at: Date,
	updated_at: Date,
});
	
	//on every save, add the date
testSchema.pre('save', function(next){
	//get the current date
	var currentDate = new Date();

	//change the updated_at field to current date
	this.updated_at = currentDate;

	//if created_at doesn't exist, add to that field
	if(!this.created_at)
		this.created_at=currentDate;

	next();
});
	//custom method to change name to all caps
	testSchema.methods.caps = function(){
		this.name = this.name.toUpperCase();

		return this.name;
	};

//create a model using the test schema
const Test = mongoose.model('Test', testSchema);

module.exports = Test;