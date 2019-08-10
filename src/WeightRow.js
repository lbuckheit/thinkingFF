import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)

    //State components:
    //value: the initial weight on the statistic that this row represents.  Initial value before any user input is zero
    this.state = {
      value: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    //when the submit button is clicked, send the value on state (also the value in the field), to the higher level component along with the name of the stat for this row, to be incorporated in a recalculation of the algorithm score
    event.preventDefault()
    this.props.handleWeightChange(this.props.statistic, this.state.value)
  }

  handleChange(event) {
    //when the value in the input changes, update the local state for this component with the value
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <span className='flex-span'>
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.props.statistic} <input name={this.props.statistic} value={this.state.value} onChange={this.handleChange}></input>
            <input type='submit' value="Update Weight"></input>
          </form>
        </div>
      </span>
    );
  }
}

export default WRWeights;
