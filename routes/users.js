var express = require('express');
var router = express.Router();
var User = require('../schema/UserSchema');
var bcrypt = require('bcrypt');
var jwtAuth = require('../authenticate/auth');
var jwt = require('jsonwebtoken');
var books = require('../schema/BookingSchema')


/* GET users listing. */

require('../dbconfig.js/db');

//POST methods for users register
router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).send({ message: 'plz filled the data' });
  } else {
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).send({ message: 'Email already exist' })
      } else {
        const hash = await bcrypt.hash(password, 10)
        var user_register = await User({ name, email, password: hash });

        user_register.save();
        return res.status(200).send({ message: 'successfull' })
        next();
      }

    } catch (error) {
      return res.status(400).send({ message: 'error' })
      
    }


  }
})


//POST METHOD FOR LOGING THE USERS
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.send({ message: 'plz filled the data' })
    } else {
      const singin = await User.findOne({ email: email });
      if (singin) {
        const isMatch = await bcrypt.compare(password, singin.password);
        const token = await singin.generateAuthtoken();
        // const token = jwt.sign({ _id: singin._id }, "sandeepnandanwarfullstackdeveloper", { expiresIn: '1h' });
        res.cookie("jwt", token, {
          path: "/",
          expires: new Date(Date.now() + 30000000),
          httpOnly: true
        })
        const { name, email } = singin;
        // res.json({ token, name, email })

        if (!isMatch) {
          return res.status(401).send({ message: 'invalid user' })
        } else {
          return res.status(200).send({ token, name, email })
          next()
        }
      } else {
        return res.status(400).send({ message: 'Invalid Credential' })
      }
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid Credential' })
  }
})

//GET METHOD  ALL THE USERS LIST
router.get('/user', async function (req, res, next) {
  await User.find().then((doc) => {
    return res.send({ item: doc })
  })
});


//GET THE USERS DETAILS AFTER LOGIN
router.get('/about', jwtAuth, (req, res) => {
  res.json({ message: req.rootUser })
  // res.send(req.rootUser)
})


//GET METHODS FOR LOGOUT TO CLEAR COOKIES
router.get('/logout', async (req, res) => {
  res.clearCookie('jwt', { path: '/' });
  res.status(200).json({ message: `logout successfull` })
})




process.on('unhandledRejection', () => {
  console.log(`unhandleRejection`);
  

})


process.on('uncaughtException', () => {
  console.log('uncaught');

})
module.exports = router;