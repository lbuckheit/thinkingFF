const rp = require('request-promise');
const $ = require('cheerio');
const QB = {name: 'QB', url: 'https://www.fantasypros.com/nfl/rankings/qb-cheatsheets.php'}
const pprRB = {name: 'pprRB', url: 'https://www.fantasypros.com/nfl/rankings/ppr-rb-cheatsheets.php'}
const pprWR = {name: 'pprWR', url: 'https://www.fantasypros.com/nfl/rankings/ppr-wr-cheatsheets.php'}
const pprTE = {name: 'pprTE', url: 'https://www.fantasypros.com/nfl/rankings/ppr-te-cheatsheets.php'}
const pages = [QB, pprRB, pprWR, pprTE]

//This loops thorough each page (category of player), scrapes their data, and prints it to a file as JSON data for parsing
for (let page of pages) {
  rp(page.url)
    .then(function(html){

      //Scraping the data
      const names = []
      $('.player-label a .full-name', html).each(function(elem) {names.push($(this).text())})

      //Writing to file
      require('fs').writeFile(

        `./${page.name}.json`,

        JSON.stringify(names),

        //handling write error
        function (err) {
            if (err) {
                console.error(err);
            }
          }
      );
    })
    //handling scrape error
    .catch(function(err){
      console.error(err)
    });
  }
