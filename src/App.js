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

//This function calculates the results of your personal algorigthm (for use inside the component lifecycle methods)
function algoScore(player, weightsObj = {}, selectedPositionIndex) {
  let AScore = 0
  for (let key in weightsObj) {
    AScore += Number(player[key] * weightsObj[key] || 0)
  }
  return AScore > 0 ? AScore : 0
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

    //State components:
    //algoComponents: a list of the elements that are currently included in the algorithm
    //weightsObj: a dictionary mapping the name of the statistic to its weight in the algorithm
    //data: an array of single player objects with the current algorithm score as a property on each player
    //gamesPlayed: a bool that determines whether to scale the data by games played in 2018
    //playerData: an array of arrays of singleplayers that is generated as the first thing in this file
    //selectedPositionIndex: a number that indicated which element of state.playerData to operate on
    this.state = {
      algoComponents: [],
      weightsObj: {},
      graphingData: [],
      gamesPlayed: false,
      playerData: [...sortedPositionArr],
      selectedPositionIndex: 0
    }

    this.QBCats = ['passing_att', 'passing_yds', 'passing_tds', 'passing_int', 'passing_sk']
    this.RBCats = ['rushing_att', 'rushing_yds', 'rushing_tds', 'receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds']
    this.WRCats = ['receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds']
    this.TECats = [...this.WRCats]
    this.catsArr = [this.QBCats, this.RBCats, this.WRCats, this.TECats]
  }

  //This checks whether the category is already included in the algorithm and displayed on the screen
  handleAddCategorySubmit(value) {
    if (this.state.algoComponents.includes(value)) {
      return
    }
    this.setState({
      algoComponents: [...this.state.algoComponents, value]
    })
  }

  //Create a new array, push a copy of each player object to it, set the algorithm score as a property on each player, and set the updated graphing data on state
  updateData(weightsObj, positionIndex) {
    let newArr = []
    for (let elem of this.state.playerData[positionIndex]) {
      newArr.push({...elem})
    }
    for (let i = 0; i < newArr.length; i++) {
      //Determining whether to scale by games played
      if (!this.state.gamesPlayed) {
        newArr[i].AScore = algoScore(newArr[i], weightsObj, positionIndex)
      } else {
        console.log('a score', newArr[i], weightsObj, positionIndex)
        newArr[i].AScore = algoScore(newArr[i], weightsObj, positionIndex) / newArr[i].games
      }

      //This position property is necessary for selecting the elements to show tooltips in the chart component
      newArr[i].position = i
    }
    this.setState({ graphingData: [...newArr]})
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  //Toggle the gamesPlayed bool on and off and then update the data once the new state is set
  handleGamesPlayed() {
    this.setState({gamesPlayed: !this.state.gamesPlayed}, function() {
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

  handlePositionChange(position) {
    switch (position) {
      case 'QB':
        this.setState({selectedPositionIndex: 0, algoComponents: [], graphingData: []})
        break
      case 'RB':
        this.setState({selectedPositionIndex: 1, algoComponents: [], graphingData: []})
        break
      case 'WR':
        this.setState({selectedPositionIndex: 2, algoComponents: [], graphingData: []})
        break
      case 'TE':
        this.setState({selectedPositionIndex: 3, algoComponents: [], graphingData: []})
        break
      default:
        return
    }
  }

  render() {
    return (
      <div className="App">
        <div height='250px'>
          ------
          ------
          ------
          BANNER
          ------
          ------
          ------
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
        </div>
        <div>
          <div>
            <WRWeights handleAddCategorySubmit={this.handleAddCategorySubmit} selectedPositionArr={this.catsArr[this.state.selectedPositionIndex]}/>
          </div>
          <div>
            <h3>Algorithm components:</h3>
            {this.state.algoComponents.map(elem => <WeightRow key={elem} statistic={elem} handleAlgo={this.handleAlgo} handleWeightChange={this.handleWeightChange}/>)}
          </div>
          <div>
            <XBar data={this.state.graphingData}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
