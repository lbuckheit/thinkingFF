import nfldb
import json

db = nfldb.connect()
q = nfldb.Query(db)

q.game(season_year=2018, season_type='Regular')
q.player(position='TE')
TEs = {}

#This quereys the DB for all quarterbacks in 2018, sorts by passing yards, and picks the top 10
for pp in q.sort('receiving_yds').limit(50).as_aggregate():
    TEs[pp.player.full_name] = {"name": pp.player.full_name, "receiving_yds": pp.receiving_yds, "receiving_rec": pp.receiving_rec, "receiving_tds": pp.receiving_tds}

#This grabs the 2018 games played data to be appended to the QB stats
with open('2018GP.json', mode='r') as gamesPlayed:
  games = json.load(gamesPlayed)

#This grabs the 2018 ADP data to be appended to the RB stats
with open('positionalADP.json', mode='r') as positionalADP:
  ADP = json.load(positionalADP)

#This appends a games property to each QB in the QBs object
for te in TEs:
  #These try statements are to catch players who have retired or unretired
  try:
    TEs[te].update({"games":games[te]})
  except:
    continue
  try:
    TEs[te].update({"ADP":ADP[te]})
  except:
    continue

#Dumping the final json file for use on the site
with open('2018TEsComplete.json', 'w') as outfile:
  json.dump(TEs, outfile)
