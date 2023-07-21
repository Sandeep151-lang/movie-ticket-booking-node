const mongoose = require('mongoose');


const booking = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: { type: String },
    Time: { type: String },
    Movie_name: { type: String },
    TotalSeats:{type:Number},
    seats: {
        type: Array,
        default: []
    },
    Total: {type: Number,}

},{timestamps:true});

module.exports=mongoose.model('booking',booking)