const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const timetableSchemas = new Schema({
  
  section: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
timeperiod: [
    {
        day:String,
        period1 : String,
        period2: String,
        period3: String,
        period4: String,
        period5: String,
        period6: String,
    }
  ]

 
 

 

});

module.exports = TimetableSchema = mongoose.model("timetable", timetableSchemas);