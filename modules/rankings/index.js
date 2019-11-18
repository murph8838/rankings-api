const {rankingsData} = require('../../data/rankingsData');

const sortEnum = [
    'andy',
    'mike',
    'jason',
    'consensus',
];

exports.getRankings = (opts) => {
    let rankings = {};
    
    // grab the subset of scoring if need be
    if (opts.scoring) {
        switch(opts.scoring.toLowerCase()) {
            case 'ppr':
                rankings = {ppr: getPpr()};
                break;
            case 'halfPpr':
                rankings = {halfPpr: getHalfPpr()};
                break;
            case 'standard':
                rankings = {standard: getStandard()};
                break;
            default:
                console.error('Invalid scoring query param detected. Returning all formats.');
                rankings = getAllRankings();
        }
    } else {
        rankings = getAllRankings();
    }

    // filter matches to the player name query param
    if (opts.playerName) {
        let filtered = {};
        // convert name filter to lower, and strip out any non-alpha chars
        const playerFilter = opts.playerName.toLowerCase().replace(/^\w/g, '');
        console.log('playerFilter: ', playerFilter);
        Object.keys(rankings).forEach(key => {
            rankings[key] = rankings[key].filter(r => {
                const comparableName = r.player.toLowerCase().replace(/^\w/g, '');
                console.log('comparableName: ', comparableName);
                return comparableName.includes(playerFilter);
            })
        });
    }

    // sort the output by the rankedBy query param
    if (opts.rankedBy) {
        let sortBy = sortEnum.includes(opts.rankedBy.toLowerCase()) ? opts.rankedBy.toLowerCase() : 'consensus';

        Object.keys(rankings).forEach(key => {
            rankings[key].sort((a,b) => {
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                } else if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                return 0;
            })
        })
    }

    return rankings;
}

function getPpr() {
    return rankingsData.ppr;
}

function getHalfPpr() {
    return rankingsData.halfPpr
}

function getStandard() {
    return rankingsData.standard;
}

function getAllRankings() {
    return rankingsData;
}
