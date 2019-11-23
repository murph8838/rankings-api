const express = require('express');
const router = express.Router();
const rankings = require('../modules/rankings');

/* GET Player rankings */
router.get('/players', (req, res, next) => {
    res.send(rankings.getPlayer(req.query.player));
});

/* GET Player rankings */
router.get('/players/:scoring', (req, res, next) => {
    res.send(rankings.getPlayer(req.query.player, req.params.scoring));
});

/* GET Position rankings */
router.get('/:position', (req, res, next) => {
    res.send(rankings.getRankings(req.params.position, '', req.query.rankedBy || ''));
});

/* GET Position Rankings for Scoring System */
router.get('/:position/:scoring', (req, res, next) => {
    res.send(rankings.getRankings(req.params.position, req.params.scoring, req.query.rankedBy || ''));
});



module.exports = router;
 