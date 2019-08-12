/* eslint-disable no-unused-vars */
import React from 'react';
import XBar from './XBar'
import WRWeights from './WRWeights'
import WeightRow from './WeightRow'
import './App.css';

import * as QBInput from "./initial_data/2018QBsComplete.json"
import * as RBInput from "./initial_data/2018RBsComplete.json"
import * as WRInput from "./initial_data/2018WRsComplete.json"
import * as TEInput from "./initial_data/2018TEsComplete.json"

//This stuff above the component processes the data initially for use by react and the charts
//creating an array of each position to be processed
let inputs = [QBInput, RBInput, WRInput, TEInput]

//Creating some variables to hold the ordered players by position, and then an array to hold them all for processing
let QBArr = []
let RBArr = []
let WRArr = []
let TEArr = []
let unsortedPositionArr = [QBArr, RBArr, WRArr, TEArr]
let sortedPositionArr = []

//Populating each position's array
for (let i = 0; i < inputs.length; i++) {
  let playerArr = unsortedPositionArr[i]
  let playerData = inputs[i].default

  //Pushing the single player objects to an array
  for (let player of Object.keys(playerData)) {
    playerArr.push(playerData[player])
  }

  //Filter out players who don't have an ADP because they retired or suck
  playerArr = playerArr.filter(player => player.ADP)

  //Sort by whatever you want (in this case, I am sorting by ADP on the x axis, and then the y axis represents the results of your personal algorithm)
  playerArr.sort((a, b) => a.ADP - b.ADP)

  //Push a sorted version of the array to sortedPositionArr, which will be used inside the component
  sortedPositionArr.push([...playerArr])
}

//This array holds a list of the counting stats so that we know what to scale per game and what to leave unscaled
let countingStats = ['passing_att', 'passing_yds', 'passing_tds', 'passing_int', 'passing_sk', 'rushing_att', 'rushing_tds', 'rushing_yds', 'cmp_air_yds', 'incmp_air_yds', 'total_air_yds', 'rushing_att', 'rushing_yds', 'rushing_tds', 'receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds']

//This function calculates the results of your personal algorigthm (for use inside the component lifecycle methods)
function algoScore(player, weightsObj = {}) {
  let AScore = 0
  for (let key in weightsObj) {
    AScore += Number(player[key] * weightsObj[key] || 0)
  }
  return AScore > 0 ? AScore : 0
}

//This goes through each of a player's stats and scales them by games played
function scaleDataByGamesPlayed(player, weightsObj) {
  for (let key in weightsObj) {
    if (countingStats.includes(key)) {
      player[key] = player[key] / player.games
    }
  }
  return player
}

//Normalizes a stat (scales it so that the #1 player for that stat gets a score of 1, and all others are their proportion of the top guy)
function normalizeStats(players, weightsObj = {}) {
  for (let key in weightsObj) {
    let largest = 0
    for (let player of players) {
      if (player[key] > largest) {
        largest = player[key]
      }
    }
    for (let player of players) {
      player[key] /= largest
    }
  }
  return players
}

class App extends React.Component {
  constructor(props) {
    super(props)

    //Binding the methods
    this.handleAddCategorySubmit = this.handleAddCategorySubmit.bind(this)
    this.updateData = this.updateData.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleGamesPlayed = this.handleGamesPlayed.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleNormalize = this.handleNormalize.bind(this)

    //State components:
    //algoComponents: a list of the elements that are currently included in the algorithm
    //weightsObj: a dictionary mapping the name of the statistic to its weight in the algorithm
    //data: an array of single player objects with the current algorithm score as a property on each player
    //gamesPlayed: a bool that determines whether to scale the data by games played in 2018
    //playerData: an array of arrays of singleplayers that is generated as the first thing in this file
    //selectedPositionIndex: a number that indicated which element of state.playerData to operate on
    //normalize: a bool that determines whether to normalize the statistics or not before including them in the algo
    this.state = {
      algoComponents: [],
      weightsObj: {},
      graphingData: [],
      gamesPlayed: false,
      playerData: [...sortedPositionArr],
      selectedPositionIndex: 0,
      normalize: false
    }

    //These arrays hold the statistics that will appear in the dropdown for each position
    this.QBCats = ['passing_att', 'passing_yds', 'passing_tds', 'passing_int', 'passing_sk', 'rushing_att', 'rushing_tds', 'rushing_yds', 'cmp_air_yds', 'incmp_air_yds', 'total_air_yds', 'ypa', 'total_air_ypa', 'cmp_air_ypa', 'td:int_ratio', 'td_rate']
    this.RBCats = ['rushing_att', 'rushing_yds', 'rushing_tds', 'receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds', 'ypa', 'rushing_td_rate', 'ypc', 'ypt', 'receiving_td_per_target']
    this.WRCats = ['receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds', 'ypc', 'ypt', 'receiving_td_per_target']
    this.TECats = [...this.WRCats]
    this.catsArr = [this.QBCats, this.RBCats, this.WRCats, this.TECats]
  }

  //This checks whether the category is already included in the algorithm and displayed on the screen
  handleAddCategorySubmit(value) {
    if (this.state.algoComponents.includes(value) || value === '') {
      return
    }
    this.setState({
      algoComponents: [...this.state.algoComponents, value]
    })
  }

  //Create a new array, push a copy of each player object to it, set the algorithm score as a property on each player, and set the updated graphing data on state
  updateData(weightsObj, positionIndex) {
    let updatedPlayers = []

    //Populating the new array with copies of each player at the relevant position
    for (let player of this.state.playerData[positionIndex]) {
      updatedPlayers.push({...player})
    }

    //Scaling by games played if necessary
    if (this.state.gamesPlayed) {
      for (let player of updatedPlayers) {
        player = scaleDataByGamesPlayed(player, weightsObj)
      }
    }
    //Normalizing the stats if necessary
    if (this.state.normalize) {
      updatedPlayers = normalizeStats(updatedPlayers, weightsObj)
    }

    for (let i = 0; i < updatedPlayers.length; i++) {
      updatedPlayers[i].AScore = algoScore(updatedPlayers[i], weightsObj)

      //This position property is necessary for selecting the elements to show tooltips in the chart component
      updatedPlayers[i].position = i
    }
    this.setState({ graphingData: [...updatedPlayers]})
  }

  //Toggle the gamesPlayed bool on and off and then update the data once the new state is set
  handleGamesPlayed() {
    this.setState({gamesPlayed: !this.state.gamesPlayed}, function() {
      this.updateData(this.state.weightsObj, this.state.selectedPositionIndex)
    })
  }

  //Toggle the normalize bool on and off and then update the data once the new state is set
  handleNormalize() {
    this.setState({normalize: !this.state.normalize}, function() {
      this.updateData(this.state.weightsObj, this.state.selectedPositionIndex)
    })
  }

  //Take in a statistc and it's updated weight, set that updated value on a copy of the existing weights object, set it on state for future reference, and then update the data with the new weights object
  handleWeightChange(statistic, value) {
    let newWeights = {...this.state.weightsObj}
    newWeights[statistic] = value
    this.setState({ weightsObj: newWeights})
    this.updateData(newWeights, this.state.selectedPositionIndex)
  }

  //Update the positionIndex on change so that we're accessing the right kind of players, and also reset the algoComponents and graphing data so that the user gets a clean slate with the new position
  handlePositionChange(position) {
    switch (position) {
      case 'QB':
        this.setState({selectedPositionIndex: 0, algoComponents: [], graphingData: [], weightsObj: {}})
        break
      case 'RB':
        this.setState({selectedPositionIndex: 1, algoComponents: [], graphingData: [], weightsObj: {}})
        break
      case 'WR':
        this.setState({selectedPositionIndex: 2, algoComponents: [], graphingData: [], weightsObj: {}})
        break
      case 'TE':
        this.setState({selectedPositionIndex: 3, algoComponents: [], graphingData: [], weightsObj: {}})
        break
      default:
        return
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <img src='https://i.imgur.com/azaU17B.png' alt='header'/>
        </div>
        <div>
          <span>
            <h3>Please select a position:</h3>
            <select onChange={(e) => this.handlePositionChange(e.target.value)}>
              <option value='QB'>QB</option>
              <option value='RB'>RB</option>
              <option value='WR'>WR</option>
              <option value='TE'>TE</option>
            </select>
          </span>
          <span>
            <h3>Scale counting stats by games played?</h3>
            <label className="switch">
              <input type="checkbox" onClick={this.handleGamesPlayed}></input>
              <span className="slider round"></span>
            </label>
          </span>
          <span>
            <h3>Normalize included statistics?</h3>
            <label className="switch">
              <input type="checkbox" onClick={this.handleNormalize}></input>
              <span className="slider round"></span>
            </label>
          </span>
        </div>
        <div>
          <div>
            <WRWeights handleAddCategorySubmit={this.handleAddCategorySubmit} selectedPositionArr={this.catsArr[this.state.selectedPositionIndex]}/>
          </div>
          <div>
            <h3>Algorithm components:</h3>
            {this.state.algoComponents.map(elem => <WeightRow key={elem} statistic={elem} handleAlgo={this.handleAlgo} handleWeightChange={this.handleWeightChange}/>)}
          </div>
          <div className='test-wrapper'>
            <div className='test-inside'>
              <XBar data={this.state.graphingData}/>
            </div>
          </div>
          <div>
            <h4>About this app</h4>
            <p>In Daniel Kahneman’s magnificent book <i>Thinking Fast and Slow</i>, he dedicates a chapter to the utility of using simple algorithms to replace subjective judgements in all sorts of applications.  He presents research indicating how simple combinations of scores (algorithms) can provide better forecasts than even expert opinions in a wide variety of fields, from wine pricing to medical diagnoses.  This app allows users to create their own simple algorithm to evaluate the statistics of NFL players from 2018, and use the results of that algorithm to find value for 2019 fantasy drafts.  A user will create a custom-weighted combination of statistics, and a player’s algorithm score (AScore) will be graphed on the y-axis, against their 2019 average draft position (ADP) on the x-axis.  Players with a higher/lower AScore than their neighbors will then represent potential value picks/players to avoid in drafts.  Obviously there are many factors that go into a player’s season than last year’s statistics, but my hope is that this site will allow fantasy managers to at least identify players worthy of further research.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
