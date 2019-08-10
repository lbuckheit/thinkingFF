/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './App.css';

class XBar extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
    	<BarChart width={600} height={300} data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="AScore" fill="#8884d8" />
      </BarChart>
    );
  }
}

export default XBar;
