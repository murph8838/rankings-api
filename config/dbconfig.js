const fs = require('fs');

const db = JSON.parse(fs.readFileSync('data-scrape.json'));

const sortEnum = [
    'andy',
    'mike',
    'jason',
    'consensus',
];

exports.getQbRankings = function(scoring = '', sortBy = '') {
    const qbRankings = {};
    if (scoring === '4pt') {
        qbRankings.qb4pt = db.qb4pt;
    } else if (scoring === '6pt') {
        qbRankings.qb6pt = db.qb6pt;
    }
    else {
        qbRankings.qb4pt = db.qb4pt;
        qbRankings.qb6pt = db.qb6pt;
    }

    if (sortBy && sortEnum.includes(sortBy)) {
        sortRankings(qbRankings, sortBy);
    } else {
        sortRankings(qbRankings, 'consensus');
    }

    return qbRankings;
}

exports.getRbRankings = function(scoring = '', sortBy = '') {
    const rbRankings = {};
    if (scoring === 'halfPpr') {
        rbRankings.rbHalfPpr = db.rbHalfPpr;
    } else if (scoring === 'ppr') {
        rbRankings.rbPpr = db.rbPpr;
    } else if (scoring === 'standard') {
        rbRankings.rbStandard = db.rbStandard;
    }
    else {
        rbRankings.rbHalfPpr = db.rbHalfPpr;
        rbRankings.rbPpr = db.rbPpr;
        rbRankings.rbStandard = db.rbStandard;
    }

    if (sortBy && sortEnum.includes(sortBy)) {
        sortRankings(rbRankings, sortBy);
    }

    return rbRankings;
}

exports.getWrRankings = function(scoring = '', sortBy = '') {
    const wrRankings = {};
    if (scoring === 'halfPpr') {
        wrRankings.wrHalfPpr = db.wrHalfPpr;
    } else if (scoring === 'ppr') {
        wrRankings.wrPpr = db.wrPpr;
    } else if (scoring === 'standard') {
        wrRankings.wrStandard = db.wrStandard;
    }
    else {
        wrRankings.wrHalfPpr = db.wrHalfPpr;
        wrRankings.wrPpr = db.wrPpr;
        wrRankings.wrStandard = db.wrStandard;
    }

    if (sortBy && sortEnum.includes(sortBy)) {
        sortRankings(wrRankings, sortBy);
    }

    return wrRankings;
}

exports.getTeRankings = function(scoring = '', sortBy = '') {
    const teRankings = {};
    if (scoring === 'halfPpr') {
        teRankings.teHalfPpr = db.teHalfPpr;
    } else if (scoring === 'ppr') {
        teRankings.tePpr = db.tePpr;
    } else if (scoring === 'standard') {
        teRankings.teStandard = db.teStandard;
    }
    else {
        teRankings.teHalfPpr = db.teHalfPpr;
        teRankings.tePpr = db.tePpr;
        teRankings.teStandard = db.teStandard;
    }

    if (sortBy && sortEnum.includes(sortBy)) {
        sortRankings(teRankings, sortBy);
    }

    return teRankings;
}

function sortRankings(rankings, sortBy) {
    Object.keys(rankings).forEach(key => {
        rankings[key].sort((a,b) => {
            if (parseInt(a[sortBy]) > parseInt(b[sortBy])) {
                return 1;
            } else if (parseInt(a[sortBy]) < parseInt(b[sortBy])) {
                return -1;
            }
            return 0;
        })
    });
}