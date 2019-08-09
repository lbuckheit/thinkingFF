import nfldb
import json

db = nfldb.connect()
q = nfldb.Query(db)

q.game(season_year=2018, season_type='Regular')
q.player(position='QB')
QBs = {}

#This quereys the DB for all quarterbacks in 2018, sorts by passing yards, and picks the top 10
for pp in q.sort('passing_yds').limit(50).as_aggregate():
    QBs[pp.player.full_name] = {"name": pp.player.full_name, "passing_yds": pp.passing_yds, "passing_tds": pp.passing_tds, "passing_int": pp.passing_int}

#This grabs the 2018 games played data to be appended to the QB stats
with open('2018GP.json', mode='r') as gamesPlayed:
  games = json.load(gamesPlayed)

#This grabs the 2018 ADP data to be appended to the QB stats
with open('positionalADP.json', mode='r') as positionalADP:
  ADP = json.load(positionalADP)

#This appends a games property to each QB in the QBs object
for qb in QBs:
  #These try statements are to catch players who have retired or unretired
  try:
    QBs[qb].update({"games":games[qb]})
  except:
    continue
  try:
    QBs[qb].update({"ADP":ADP[qb]})
  except:
    continue

#Dumping the final json file for use on the site
with open('2018QBsComplete.json', 'w') as outfile:
  json.dump(QBs, outfile)
