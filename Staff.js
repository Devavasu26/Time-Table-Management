const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const staffSchemas = new Schema({
  
    email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },


  role: {
    type: String,
    required: true,
  },

  class: [
    {
        department : String,
        year: String,
        semester: String,
        section: String,
    }
  ]

});

module.exports = StaffSchema = mongoose.model("staff", staffSchemas);