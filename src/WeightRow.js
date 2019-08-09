import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {

  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <span className='flex-span'>
        {this.capitalize(this.props.statistic)}: <input name={this.props.statistic} size='10' type='number'></input>
      </span>
    );
  }
}

export default WRWeights;
