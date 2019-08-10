import nfldb
import json

db = nfldb.connect()
q = nfldb.Query(db)

q.game(season_year=2018, season_type='Regular')
q.player(position='RB')
RBs = {}

qq = nfldb.Query(db)
qq.game(season_year=2018)
qq.player(player_id='00-0034844')
for pp in qq.as_aggregate():
  RBs['Saquon Barkley'] = {"name": 'Saquon Barkley', "yards": pp.rushing_yds, "carries": pp.rushing_att, "rushing touchdowns": pp.rushing_tds}

#This quereys the DB for all runningbacks in 2018, sorts by rushing yards, and picks the top 49 (leaving room for Saquon)
for pp in q.sort('rushing_yds').limit(49).as_aggregate():
  RBs[pp.player.full_name] = {"name": pp.player.full_name, "yards": pp.rushing_yds, "carries": pp.rushing_att, "rushing touchdowns": pp.rushing_tds}

#This grabs the 2018 games played data to be appended to the QB stats
with open('2018GP.json', mode='r') as gamesPlayed:
  games = json.load(gamesPlayed)

#This grabs the 2018 ADP data to be appended to the RB stats
with open('positionalADP.json', mode='r') as positionalADP:
  ADP = json.load(positionalADP)

#This appends a games property to each QB in the QBs object
for rb in RBs:
  #These try statements are to catch players who have retired or unretired
  try:
    RBs[rb].update({"games":games[rb]})
  except:
    continue
  try:
    RBs[rb].update({"ADP":ADP[rb]})
  except:
    continue

#Dumping the final json file for use on the site
with open('2018RBsComplete.json', 'w') as outfile:
  json.dump(RBs, outfile)
