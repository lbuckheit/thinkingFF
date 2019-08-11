import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      target: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleAddCategorySubmit(this.state.target)
  }

  handleChange(event) {
    this.setState({ target: event.target.value })
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <h3>Select a statistic to include in your algorithm</h3>
        <select onChange={(e) => this.handleChange(e)}>
          <option>Pick one</option>
          {this.props.selectedPositionArr.map(elem => <option key={elem} value={elem}>{elem}</option>)}
        </select>
        <button type='submit'>Add to algorithm</button>
      </form>
    );
  }
}

export default WRWeights;
