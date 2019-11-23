const db = require('../../config/dbconfig');

const getRankings = function(position, scoring = '', sortBy = '') {

    switch (position.toLowerCase()) {
        case 'qb':
            return db.getQbRankings(scoring, sortBy);
        case 'rb':
            return db.getRbRankings(scoring, sortBy);
        case 'wr':
            return db.getWrRankings(scoring, sortBy);
        case 'te':
            return db.getTeRankings(scoring, sortBy);
        default:
            throw 'Invalid position!';
    }
}

const getPlayer = function(player, scoring) {
    // convert name filter to lower, and strip out any non-alpha chars
    const p = player.toLowerCase().replace(/^\w/g, '');
    return db.getPlayerRankings(p, scoring);
}

exports.getRankings =  getRankings;
exports.getPlayer = getPlayer;