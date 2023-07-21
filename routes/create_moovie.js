var express = require('express');
const jwtAuth = require('../authenticate/auth');
var router = express.Router();
const movie = require('../schema/CreateMovie')
const show = require('../schema/BookingSchema');

router.post('/createMovie', async (req, res) => {
    const { Time, Image, Movie_name,date, Total } = req.body;
  
    try {
        const booking = new movie({ Image, Movie_name,date, Time ,Total});
       await booking.save();
        return res.status(201).json({message:'Movie Created'})
    } catch (error) {
        return res.status(400).json({message:'error'})
    }
  
})

router.get('/getMovie', async (req, res) => {
    try {
        await movie.find().then((success) => {
         return res.status(200).json({message:success})
        }).catch((error) => {
         return res.status(400).json({message:error})
     })
    } catch (error) {
        
    }
})

router.get('/show', jwtAuth, async function (req, res, next) {
    console.log(req.rootUser._id)
    try {
        const sh = await show.findById({ user_id: req.rootUser._id })
        
       return res.status(200).json({ message: sh })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

router.get('/getMovieId/:_id', async (req, res) => {
    const {_id}=req.params
    try {
        await movie.findById({ _id }).then((ele) => {
            return res.status(200).json({message:ele})
        }).catch((error) => {
            return res.status(400).json({message:error})
        })
       
    } catch (error) {
        return res.status(400).json({message:'error'})
    }
})




router.put('/updateSeats', async (req, res) => {
    
    const { yes } = req.body;
     await movie.findOneAndUpdate({ _id: req.body._id }, { $push: { Seats:yes } })
    
})

module.exports= router
