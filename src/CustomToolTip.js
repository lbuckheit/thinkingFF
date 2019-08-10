import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './App.css';

class CustomToolTip extends React.Component {
    constructor(props) {
      super(props)
      console.log(props.data)
    }

    render() {
      const { active } = this.props;

      if (active) {
        const { payload, label } = this.props;
        return (
          <div className="custom-tooltip">
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        );
      }

      return null;
    }
  }

export default CustomToolTip
