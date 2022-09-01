const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const userSchemas = new Schema({
  
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
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true, 
  },
  role: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },

});

module.exports = UserSchema = mongoose.model("user", userSchemas);