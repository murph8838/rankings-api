const express = require('express');
const router = express.Router();
const rankings = require('../modules/rankings');

/* GET Position rankings */
router.get('/:position', (req, res, next) => {
    res.send(rankings.getRankings(req.params.position, '', req.query.rankedBy || ''));
});

/* GET Position Rankings for Scoring System */
router.get('/:position/:scoring', (req, res, next) => {
    res.send(rankings.getRankings(req.params.position, req.params.scoring, req.query.rankedBy || ''));
});

/* GET Player rankings */
router.get('/player/:player', (req, res, next) => {
    res.send(rankings.getPlayer(req.params.player));
});

module.exports = router;
 