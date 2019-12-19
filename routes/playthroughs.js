var express = require('express');
var router = express.Router();
const withAuth = require('../middleware');
const Playthrough = require('../models/playthrough');

router.post('/', withAuth, function (req, res) {
  const playthrough = new Playthrough({
    user: req.body.user,
    winnings: req.body.winnings,
    round: req.body.round,
    complete: req.body.complete,
    updated: new Date()
  });
  playthrough.save(function (err, playthrough) {
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else {
      res.json({ gameId: playthrough._id });
    }
  })
});

router.post('/:id', withAuth, function (req, res) {
  const updatedPlaythrough = new Playthrough({
    user: req.body.user,
    winnings: req.body.winnings,
    round: req.body.round,
    complete: req.body.complete,
    updated: new Date(),
    _id: req.params.id
  });
  Playthrough.findByIdAndUpdate(req.params.id, updatedPlaythrough, {}, function (err, updated) {
    if (err) {
      console.log(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else {
      res.status(200).send("Game Updated");
    }
  })
})

module.exports = router;