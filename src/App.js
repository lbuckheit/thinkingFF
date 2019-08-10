/* eslint-disable no-unused-vars */
import React from 'react';
import XBar from './XBar'
import WRWeights from './WRWeights'
import WeightRow from './WeightRow'
import './App.css';

import * as input from "./initial_data/2018WRsComplete.json"

//This stuff above the component processes the data initially for use by react and the charts
let WRArr = []
let WRData = input.default

//Pushing the single player objects to an array
for (let wr of Object.keys(WRData)) {
  WRArr.push(WRData[wr])
}

//Filter out players who don't have an ADP because they retired or suck
WRArr = WRArr.filter(wr => wr.ADP)

//Sort by whatever you want (in this case, I am sorting by ADP on the x axis, and then the y axis represents the results of your personal algorithm)
WRArr.sort((a, b) => a.ADP - b.ADP)

//This function, currently misnamed, calculates the results of your personal algorigthm (for use inside the component lifecycle methods)
function algoScore(wr, weightsObj = {}) {
  let AScore = Number(wr.receiving_yds * weightsObj['receiving_yds'] || 0) + Number(wr.receiving_tds * weightsObj['receiving_tds'] || 0) + Number(wr.receiving_rec * weightsObj['receiving_rec'] || 0) + Number(wr.receiving_tar * weightsObj['receiving_tar'] || 0)
  return AScore > 0 ? AScore : 0
}

class App extends React.Component {
  constructor(props) {
    super(props)

    //Binding the methods
    this.handleAddCategorySubmit = this.handleAddCategorySubmit.bind(this)
    this.updateData = this.updateData.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)

    //State components:
    //algoComponents: a list of the elements that are currently included in the algorithm
    //weightsObj: a dictionary mapping the name of the statistic to its weight in the algorithm
    //data: an array of single player objects with the current algorithm score as a property on each player
    this.state = {
      algoComponents: [],
      weightsObj: {},
      graphingData: []
    }
  }

  handleAddCategorySubmit(value) {
    //This checks whether the category is already included in the algorithm and displayed on the screen
    if (this.state.algoComponents.includes(value)) {
      return
    }
    this.setState({
      algoComponents: [...this.state.algoComponents, value]
    })
  }

  updateData(weightsObj) {
    //Create a new array, push a copy of each player object to it, set the algorithm score as a property on each player, and set the updated graphing data on state
    let newArr = []
    for (let elem of WRArr) {
      newArr.push({...elem})
    }
    for (let elem of newArr) {
      elem.AScore = algoScore(elem, weightsObj)
    }
    this.setState({ graphingData: [...newArr]})
  }

  componentDidUpdate() {
  }

  handleWeightChange(statistic, value) {
    //Take in a statistc and it's updated weight, set that updated value on a copy of the existing weights object, set it on state for future reference, and then update the data with the new weights object
    let newWeights = {...this.state.weightsObj}
    newWeights[statistic] = value
    this.setState({ weightsObj: newWeights})
    this.updateData(newWeights)
  }

  render() {
    return (
      <div className="App">
        <div height='250px'>
          BANNER
        </div>
        <WRWeights handleAddCategorySubmit={this.handleAddCategorySubmit}/>
        <p>Algorithm components:</p>
        {this.state.algoComponents.map(elem => <WeightRow key={elem} statistic={elem} handleAlgo={this.handleAlgo} handleWeightChange={this.handleWeightChange}/>)}
        <XBar data={this.state.graphingData}/>
      </div>
    );
  }
}

export default App;
