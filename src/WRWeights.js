import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  render() {
    return (
      <form className="dropdown">
        <h3>Select a statistic to include in your algorithm</h3>
        <select>
          <option>Receptions</option>
          <option>Targets</option>
          <option>Receiving Touchdowns</option>
        </select>
        <button type='submit'>Add to algorithm</button>
      </form>
    );
  }
}

export default WRWeights;
