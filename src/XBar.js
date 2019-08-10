/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
//import CustomTooltip from './CustomTooltip'
import './App.css';

//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
//BIG TIME NOTE:RIGHT NOW THIS LIST OF 50 IS NOT THE 50 TOP SCORERS FROM LAST SEASON.  IT IS THE 50 RECEIVERS WITH THE MOST YARDS
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------

class XBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: null
    }
    this.renderBarTooltip = this.renderBarTooltip.bind(this)
  }

  renderBarTooltip(index) {
    this.setState({activeIndex: index.position})
  }

  render () {
    const activeIndex = this.state.activeIndex
    const activeItem = this.props.data[activeIndex] || {name: '', AScore: null};
    return (
      <div>
    	<BarChart width={800} height={400} data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="0 0"/>
       <XAxis dataKey='name' />
       <YAxis/>
       <Tooltip />
       <Legend />
       <Bar onMouseOver={(index) => this.renderBarTooltip(index)} dataKey="AScore" fill="#8884d8" onClick={this.handleClick} />
      </BarChart>
      <p className="content">{activeItem.name ? `AScore of "${activeItem.name}": ${activeItem.AScore}` : ''}</p>
      </div>
    );
  }
}

export default XBar;
