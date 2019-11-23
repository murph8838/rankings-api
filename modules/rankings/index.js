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

const getPlayer = function(player) {
    // filter matches to the player name query param
    // if (opts.playerName) {
    //     let filtered = {};
    //     // convert name filter to lower, and strip out any non-alpha chars
    //     const playerFilter = opts.playerName.toLowerCase().replace(/^\w/g, '');
    //     console.log('playerFilter: ', playerFilter);
    //     Object.keys(rankings).forEach(key => {
    //         rankings[key] = rankings[key].filter(r => {
    //             const comparableName = r.player.toLowerCase().replace(/^\w/g, '');
    //             console.log('comparableName: ', comparableName);
    //             return comparableName.includes(playerFilter);
    //         })
    //     });
    // }
}

exports = {
    getRankings,
    getPlayer
};