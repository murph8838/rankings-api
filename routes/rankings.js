const express = require('express');
const router = express.Router();
const rankings = require('../modules/rankings');

/* GET all rankings */
router.get('/', function(req, res, next) {
  let opts = null;
  if (req.query) {
    opts = {
      scoring: req.query.scoring,
      rankedBy: req.query.rankedBy,
      playerName: req.query.playerName,
    };
  }
  res.send(rankings.getRankings(opts));
});

module.exports = router;
 