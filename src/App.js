/* eslint-disable no-unused-vars */
import React from 'react';
import XBar from './XBar'
import WRWeights from './WRWeights'
import WeightRow from './WeightRow'
import './App.css';

import * as input from "./initial_data/2018WRsComplete.json"

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

function fantasyPoints(wr) {
  let fpts = Math.floor((wr.receiving_yds * 0.1) + (wr.receiving_tds * 6) + (wr.receiving_rec * 1))
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
    this.handleChange = this.handleChange.bind(this)
    this.handleTest = this.handleTest.bind(this)
    this.state = {
      algoComponents: [],
      multi: 1
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

  handleChange(event) {
    let multi = event.target.value
    let newArr = []
    for (let i = 0; i < normalized.length; i++) {
      newArr.push({...normalized[i]})
    }
    for (let elem of newArr) {
      elem.fpts *= multi
    }
    this.data = [...newArr]
  }

  handleTest() {
    this.setState({ multi: this.payload })
  }

  render() {
    return (
      <div className="App">
        <div height='250px'>
          BANNER
        </div>
        {/*<WRWeights handleSubmit={this.handleSubmit}/>*/}
        <p>Algorithm components:</p>
        {/*{this.state.algoComponents.map(elem => <WeightRow key={elem} statistic={elem}/>)}*/}
        <div>
          <button onClick={this.handleTest}>Update A-scores</button>
          <input onChange={(e) => this.handleChange(e)}></input>
        </div>
        <XBar data={this.data}/>
      </div>
    );
  }
}

export default App;
