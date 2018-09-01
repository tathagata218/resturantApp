const mongoose = require('mongoose')
const Schema = mongoose.Schema
//This is model information
const restData = new Schema({
    resturantName : {type : String, require: true},
    resturantAddress : {type : String, require: true},
    resturantPhone : {type : String, require: true},
    resturantCoords : {type: String, required: true},
    resturantURL : {type : String, required: true}
}) 

const resturantData = mongoose.model('resturantData',restData)

module.exports = resturantData