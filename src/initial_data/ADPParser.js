const fs = require('fs');
const files = ['QB', 'pprRB', 'pprWR', 'pprTE']
const names = {}
const positionalADP = {}

//This loops through each file that the scraper created and parses their JSON, adding them to the list of names under their position
for (let file of files) {
  const nameData = fs.readFileSync(`./${file}ADP.json`, function read(err, data) {
    if (err) {
      throw err;
    }
  });
  names[file] = JSON.parse(nameData);
}

processQBs(names.QB)
processRBs(names.pprRB)
processWRs(names.pprWR)
processTEs(names.pprTE)
writeToFile(positionalADP)

//These files take in the positional object from the names object and add the name and positional ADP to the positionalADP object
function processQBs(QBnames) {
  for (let i = 0; i < QBnames.length; i++) {
    positionalADP[QBnames[i]] = i + 1
  }
}

function processRBs(RBnames) {
  for (let i = 0; i < RBnames.length; i++) {
    positionalADP[RBnames[i]] = i + 1
  }
}

function processWRs(WRnames) {
  for (let i = 0; i < WRnames.length; i++) {
    positionalADP[WRnames[i]] = i + 1
  }
}

function processTEs(TEnames) {
  for (let i = 0; i < TEnames.length; i++) {
    positionalADP[TEnames[i]] = i + 1
  }
}

function writeToFile(json) {
  fs.writeFile(

    `./positionalADP.json`,

    JSON.stringify(json),

    //handling write error
    function (err) {
        if (err) {
            console.error(err);
        }
      }
  );
}
