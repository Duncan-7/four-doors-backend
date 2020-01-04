var express = require('express');
var router = express.Router();
const withAuth = require('../middleware');
const Playthrough = require('../models/playthrough');
const playthroughController = require('../controllers/playthroughController')

router.post('/', withAuth, playthroughController.createPlaythrough);

router.post('/:id', withAuth, playthroughController.updatePlaythrough);

router.post('/game/:id', withAuth, playthroughController.playRound);

router.post('/game/:id/nextround', withAuth, playthroughController.nextRound);

router.post('/game/:id/cashout', withAuth, playthroughController.cashOut);

module.exports = router;