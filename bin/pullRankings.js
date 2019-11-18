const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');

let data = {};

const pages = {
    qb6pt: 'https://www.thefantasyfootballers.com/2019-quarterback-rankings/',
    qb4pt: 'https://www.thefantasyfootballers.com/2019-quarterback-rankings/?scoring=4pt',
    rbHalfPpr: 'https://www.thefantasyfootballers.com/2019-running-back-rankings/',
    rbPpr: 'https://www.thefantasyfootballers.com/2019-running-back-rankings/?scoring=ppr',
    rbStandard: 'https://www.thefantasyfootballers.com/2019-running-back-rankings/?scoring=standard',
    wrHalfPpr: 'https://www.thefantasyfootballers.com/2019-wide-receiver-rankings/',
    wrPpr: 'https://www.thefantasyfootballers.com/2019-wide-receiver-rankings/?scoring=ppr',
    wrStandard: 'https://www.thefantasyfootballers.com/2019-wide-receiver-rankings/?scoring=standard',
    teHalfPpr: 'https://www.thefantasyfootballers.com/2019-tight-end-rankings/',
    tePpr: 'https://www.thefantasyfootballers.com/2019-tight-end-rankings/?scoring=ppr',
    teStandard: 'https://www.thefantasyfootballers.com/2019-tight-end-rankings/?scoring=standard',
}

async function run() {
    for (const key of Object.keys(pages)) {
        try {
            const browser = await puppeteer.launch({headless:true});
            const page = await browser.newPage();
            await page.goto(pages[key]);
            await page.waitForSelector('#FreeRankingsTable > tbody > tr');
            const result = await page.evaluate(() => {
                const rows = document.querySelectorAll('#FreeRankingsTable > tbody > tr');
                let players = [];
                for (let i = 0; i < rows.length; i++) {
                    let cols = rows[i].querySelectorAll('td');
                    let name = cols[0].querySelector('div > div.player-right > div.player-right-line-one > div');
                    let player = {
                        name: cols[0].querySelector('div > div.player-right > div.player-right-line-one > div').innerText.trim(),
                        team: cols[0].querySelector('.player-right-line-two').innerText.trim().split(' ')[0],
                        opponent: cols[1].innerText.trim(),
                        consensus: cols[2].innerText.trim(),
                        andy: cols[3].innerText.trim(),
                        jason: cols[4].innerText.trim(),
                        mike: cols[5].innerText.trim(),
                    };
                    players.push(player);
                }
                return players;
            });

            // do something with evaluated page
            data[key] = result;
            browser.close();
        } catch(err) {
            console.error('error: ', err);
            browser.close();
        }
    }

    fs.writeFile('data-scrape.json', JSON.stringify(data), err => {
        if (err) {
            console.error('Error writing file: ', err);
        }
    });
};

run();