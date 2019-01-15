const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
    name : String,
    email : String,
    position : String,
    department : String,
    project : String,
    seat : String
})

module.exports = mongoose.model('employee', employeeSchema, 'employees') 