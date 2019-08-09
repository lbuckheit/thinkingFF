import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      target: ''
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
          <option value='receptions'>Receptions</option>
          <option value='targets'>Targets</option>
          <option value='receiving_tds'>Receiving Touchdowns</option>
        </select>
        <button type='submit'>Add to algorithm</button>
      </form>
    );
  }
}

export default WRWeights;
