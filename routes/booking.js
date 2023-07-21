var express = require('express');
var router = express.Router();
var show = require('../schema/BookingSchema');
var jwtAuth = require('../authenticate/auth');
var jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51K1p90SJsqVvBs7nBt5QMaiBrOaB847tNRNQqvtYzEPMqHDTbuY18uaPmLUHLmAxYl0inI66Nc2N9jXUyWxw5NFN0056EvzNum');


router.post('/ticketBooking', async (req, res) => {
    try {
        console.log(req.body.token, req.body.total);
        const { user_id, date, Total, Movie_name, TotalSeats, seats, Time,token ,name,email} = req.body
        //const { token, total, cart, name, email, id, address, starttime, Total, endtime } = req.body
        //console.log(Total, starttime, endtime);
        stripe.customers
            .create({
                name: name,
                email: email,
                source: token,
            })
            .then(customer => {
                const payment = stripe.charges.create({
                    amount: Total * 100,
                    currency: "inr",
                    customer: customer.id
                })
                if (payment) {
                    const book =  show({ user_id, seats, date, Total, Movie_name, TotalSeats, Time })
                    const orders = book.save();
                    if (orders) {
                        return res.status(200).json(`payment success`)
                    } else {
                        return res.status(400).json(`invalid`)
                    }
                }
            }
            )
            .then(() => res.json("payment successfull"))
            .catch(err => console.log(err));
    } catch (err) {
       return res.status(400).send(err);
    }
})

router.get('/getdetails', jwtAuth, async (req, res) => {
    try {
        await show.find({ user_id: req.rootUser._id }).then((item) => {
            return res.status(200).json({message:item})
        })
    } catch (error) {
        return res.status(400).json({message:'error'})
    }
})

module.exports = router;