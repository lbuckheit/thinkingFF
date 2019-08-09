import React from 'react';
import XBar from './XBar'
import WRWeights from './WRWeights'
import WeightRow from './WeightRow'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      algoComponents: []
    }
  }

  handleSubmit(value) {
    if (this.state.algoComponents.includes(value)) {
      return
    }
    this.setState({
      algoComponents: [...this.state.algoComponents, value]
    })
  }

  render() {
    return (
      <div className="App">
        <div height='250px'>
          BANNER
        </div>
        <WRWeights handleSubmit={this.handleSubmit}/>
        <p>Algorithm components:</p>
        {this.state.algoComponents.map(elem => <WeightRow statistic={elem}/>)}
        <div>
          <button>Update A-scores</button>
        </div>
        <XBar />
      </div>
    );
  }
}

export default App;
