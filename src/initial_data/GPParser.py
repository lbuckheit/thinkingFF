#Run in Python3

import csv
import re
import json

p = re.compile('[*+/]')
playerGames = {}

#This takes the PFR data and creates an object where the key is the player's name and the value is the number of games he played in 2018
with open('2018FantasyPFR.txt', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        pl = row["Player"]
        player = re.split('[*+\\\\]', pl)[0]
        playerGames[player] = row["G"]
        #print(f'{player} played {row["G"]} games in 2018')
        line_count += 1
    print(f'Processed {line_count} lines.')
    for player in playerGames:
        print(player, playerGames[player])

with open('2018GP.json', 'w') as outfile:
    json.dump(playerGames, outfile)
