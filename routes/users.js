var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');
const Playthrough = require('../models/playthrough');

/* CREATE User */
router.post('/', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      console.log(err)
      res.status(500)
        .send("Error creating user");
    } else {
      res.status(200).send("User created")
    }
  });
});

//Log in User
router.post('/login', function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = {
            email: email,
            id: user._id
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
          });
          res.json({ token: token, userId: user._id })
        }
      });
    }
  });
});

router.get('/test', withAuth, function (req, res) {
  res.send('testing auth');
})

router.get('/:id/history', withAuth, function (req, res, next) {
  Playthrough.find({ 'user': req.params.id }).exec(function (err, results) {
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    }
    res.json({ playerData: results });
  })
})




module.exports = router;
