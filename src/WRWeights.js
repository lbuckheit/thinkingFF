import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      target: 'receiving_rec'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit(this.state.target)
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <h3>Select a statistic to include in your algorithm</h3>
        <select onChange={(e) => this.setState({ target: e.target.value })}>
          <option selected value='receiving_rec'>receiving_rec</option>
          <option value='receiving_tgt'>receiving_tgt</option>
          <option value='receiving_tds'>receiving_tds</option>
        </select>
        <button type='submit'>Add to algorithm</button>
      </form>
    );
  }
}

export default WRWeights;
