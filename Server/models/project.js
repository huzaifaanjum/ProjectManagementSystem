const mongoose = require('mongoose')
const Schema = mongoose.Schema
const projectSchema = new Schema({
    name : String,
    description : String,
    owner : String,
    startDate : String,
    endDate : String,
    manager : String,
    uname: String
})

module.exports = mongoose.model('project', projectSchema, 'projects') 