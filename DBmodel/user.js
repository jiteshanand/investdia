var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({

userid:     String,
username:   String,
name:      {firstname:String,lastname:String},
gender:String,
email: 		String,
password:   String,
type:String,
city:String,
state:String,
country:String,
pincode:Number,
followers:Number,
connections:Number
});

var stockhistory = new Schema({

symbol:   String,
values:   [{
date:     Date,
open: 	  Number,
close:    Number,
high:     Number,
low:      Number,
volume:   Number
	}]
});

var mfhistory = new Schema({
	nav_code: String,
	values:[{
		date: Date,
		open: Number
	}]
});

var mutual_fund = new Schema({

amc_name: String,
amc_number: Number,
schemes:  [
{
scheme_number:    Number,
scheme_name: 	  Number,
scheme_benchmark:String,
scheme_risk_rating:Number,
scheme_crisil_rating:Number,
scheme_expense_ratio_regular:Number,
scheme_expense_ratio_direct:Number,
scheme_inception_date:Date,
scheme_category:String,
scheme_type:String,
scheme_minimum_investment:Number,
scheme_load:String,
scheme_nav:[
{
	nav_code:Number,
	nav_name:String,
	nav_plan:String,
	nav_option:String
}]
	}]
});


var User = mongoose.model('User',userschema);
var history = mongoose.model('history',stockhistory);
var mfhistory = mongoose.model('mfhistory',mfhistory);
var mfdetail = mongoose.model('mfdetail',mutual_fund);
module.exports = history;
module.exports = User;
module.exports = mfdetail;
module.exports = mfhistory;