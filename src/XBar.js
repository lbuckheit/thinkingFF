/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
//import CustomTooltip from './CustomTooltip'
import './App.css';

class XBar extends React.Component {
  constructor(props){
    super(props)
    //State components:
    //activeIndex: which bar is currently being moused over to display the tooltip
    this.state = {
      activeIndex: null
    }
    //Binding methods
    this.renderBarTooltip = this.renderBarTooltip.bind(this)
  }

  //Sets the state to whichever bar is being moused over so data can be displayed
  renderBarTooltip(index) {
    this.setState({activeIndex: index.position})
  }

  render () {
    //Declaring the index currently being moused over, and declaring a variable for that item's data
    const activeIndex = this.state.activeIndex
    const activeItem = this.props.data[activeIndex] || {name: '', AScore: null};
    return (
      <div>
        <BarChart width={1000} height={500} data={this.props.data}
              margin={{top: 5, right: 60, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="2 2" interval={10}/>
          <XAxis dataKey='name' angle={45} textAnchor='start' interval={0} height={120} width={50} ticks={[]} fontSize={12}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar onMouseOver={(index) => this.renderBarTooltip(index)} dataKey="AScore" fill="#2196F3" />
        </BarChart>
        <p className="content">{activeItem.name ? `AScore of ${activeItem.name}: ${activeItem.AScore}` : ''}</p>
      </div>
    );
  }
}

export default XBar;
