import nfldb
import json

db = nfldb.connect()
q = nfldb.Query(db)

q.game(season_year=2018, season_type='Regular')
q.player(position='WR')
WRs = {}

#This quereys the DB for all WRs in 2018, sorts by receiving yards, and picks the top 50
for pp in q.sort('receiving_yds').limit(50).as_aggregate():
    WRs[pp.player.full_name] = {"name": pp.player.full_name, "receiving_yds": pp.receiving_yds, "receiving_rec": pp.receiving_rec, "receiving_tds": pp.receiving_tds, "receiving_tar": pp.receiving_tar}

#This grabs the 2018 games played data to be appended to the WR stats
with open('2018GP.json', mode='r') as gamesPlayed:
  games = json.load(gamesPlayed)

#This grabs the 2018 ADP data to be appended to the WR stats
with open('positionalADP.json', mode='r') as positionalADP:
  ADP = json.load(positionalADP)

#This appends a games property to each WR in the WRs object
for wr in WRs:
  #These try statements are to catch players who have retired or unretired
  try:
    WRs[wr].update({"games":games[wr]})
  except:
    continue
  try:
    if wr == 'Odell Beckham':
      wr2 = 'Odell Beckham Jr.'
      WRs[wr].update({"ADP":ADP[wr2]})
    else:
      WRs[wr].update({"ADP":ADP[wr]})
  except:
    continue

#Dumping the final json file for use on the site
with open('2018WRsComplete.json', 'w') as outfile:
  json.dump(WRs, outfile)
