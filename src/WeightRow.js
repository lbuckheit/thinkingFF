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

  render() {
    return (
      <span className='flex-span'>
        whatever: <input name={this.props.statistic} size='10' type='number'></input>
      </span>
    );
  }
}

export default WRWeights;
