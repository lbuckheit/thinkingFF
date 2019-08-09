/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
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

class XBar extends React.Component {
  constructor(props){
    super(props)
    this.data = [...normalized]
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    let multi = this.props.multi
    let newArr = []
    for (let i = 0; i < normalized.length; i++) {
      newArr.push({...normalized[i]})
    }
    for (let elem of newArr) {
      elem.fpts *= multi
    }
    console.log(this.data[0])
    this.data = [...newArr]
    console.log(this.data[0])
  }

  render () {
    return (
    	<BarChart width={600} height={300} data={this.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="fpts" fill="#8884d8" />
      </BarChart>
    );
  }
}

export default XBar;
