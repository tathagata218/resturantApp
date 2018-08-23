const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restData = new Schema({
    name : {type : String, require: true},
    info : {type : String, require: true}
}) 

const resturantData = mongoose.model('resturantData',restData)

module.exports = resturantData