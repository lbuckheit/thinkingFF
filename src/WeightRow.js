import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleTest(this.props.statistic, this.state.value)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <span className='flex-span'>
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.props.statistic} <input name={this.props.statistic} value={this.state.value} type='number' onChange={this.handleChange}></input>
            <input type='submit' value="Update Weight"></input>
          </form>
        </div>
      </span>
    );
  }
}

export default WRWeights;
