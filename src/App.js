/* eslint-disable no-unused-vars */
import React from 'react';
import XBar from './XBar'
import WRWeights from './WRWeights'
import WeightRow from './WeightRow'
import './App.css';

import * as input from "./initial_data/2018WRsComplete.json"

//This stuff above the component proesses the data initially for use by react and the charts
let WRArr = []
let WRData = input.default

//Pushing the objects to an iterable array
for (let wr of Object.keys(WRData)) {
  WRArr.push(WRData[wr])
}

//Filter out players who don't have an ADP because they retired or suck
WRArr = WRArr.filter(wr => wr.ADP)

//Sort by whatever you want (in this case, I am sorting by ADP on the y axis, and then the X axis represents the results of your personal algorithm)
WRArr.sort((a, b) => a.ADP - b.ADP)

function fantasyPoints(wr, weightsObj = {}) {
  let fpts = Number(wr.receiving_yds * weightsObj['receiving_yds'] || 0) + Number(wr.receiving_tds * weightsObj['receiving_tds'] || 0) + Number(wr.receiving_rec * weightsObj['receiving_rec'] || 0) + Number(wr.receiving_tar * weightsObj['receiving_tar'] || 0)
  return fpts > 0 ? fpts : 0
}

//Normalize/functionalize the data being graphed
let normalized = WRArr.map(function(wr) {
  return {...wr, fpts: fantasyPoints(wr)}
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateData = this.updateData.bind(this)
    this.handleTest = this.handleTest.bind(this)
    this.state = {
      algoComponents: [],
      weightsObj: {},
      data: [...normalized]
    }
    this.payload = {}
    this.data = [...normalized]
  }

  handleSubmit(value) {
    if (this.state.algoComponents.includes(value)) {
      return
    }
    this.setState({
      algoComponents: [...this.state.algoComponents, value]
    })
  }

  updateData(weightsObj) {
    console.log('updating data')
    let newArr = []
    for (let i = 0; i < normalized.length; i++) {
      newArr.push({...normalized[i]})
    }
    console.log('updating data weightsObj', weightsObj)
    for (let elem of newArr) {
      elem.fpts = fantasyPoints(elem, weightsObj)
    }
    //this.data = [...newArr]
    this.setState({ data: [...newArr]})
  }

  componentDidUpdate() {
    console.log('state on update', this.state.data[0])
  }

/*   handleAlgo(key, value) {
    let newWeightsObj = {...this.state.weightsObj}
    newWeightsObj[key] = value
    this.setState({ weightsObj: newWeightsObj})
  } */

  handleTest(statistic, value) {
    let newWeights = {...this.state.weightsObj}
    newWeights[statistic] = value
    console.log('in handletest', newWeights, this.state.weightsObj)
    this.setState({ weightsObj: newWeights})
    this.updateData(newWeights)
    //this.setState({ weightsObj: newWeights})
  }

  render() {
    return (
      <div className="App">
        <div height='250px'>
          BANNER
        </div>
        <WRWeights handleSubmit={this.handleSubmit}/>
        <p>Algorithm components:</p>
        {this.state.algoComponents.map(elem => <WeightRow key={elem} statistic={elem} handleAlgo={this.handleAlgo} handleTest={this.handleTest}/>)}
        <div>
          {/*<button onClick={this.handleTest}>Update A-scores</button>*/}
          {/*<input onChange={(e) => this.handleChange(e)}></input>*/}
        </div>
        <XBar data={this.state.data}/>
      </div>
    );
  }
}

export default App;
