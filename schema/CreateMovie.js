const mongoose = require('mongoose');

const movie = new mongoose.Schema({
   
    Image: { type: String },
    Movie_name: { type: String },
    date:{type:String},
    Time: { type: String },
    Total: { type: Number },
    Seats:{type:Object}
},{timestamps:true})

module.exports=mongoose.model('CreateMovie',movie)