/* eslint-disable no-unused-vars */
import React from 'react';
import XBar from './XBar'
import WRWeights from './WRWeights'
import WeightRow from './WeightRow'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTest = this.handleTest.bind(this)
    this.state = {
      algoComponents: [],
      multi: 1
    }
    this.payload = {}
  }

  handleSubmit(value) {
    if (this.state.algoComponents.includes(value)) {
      return
    }
    this.setState({
      algoComponents: [...this.state.algoComponents, value]
    })
  }

  handleChange(event) {
    this.payload = event.target.value
  }

  handleTest() {
    this.setState({ multi: this.payload })
  }

  render() {
    return (
      <div className="App">
        <div height='250px'>
          BANNER
        </div>
        {/*<WRWeights handleSubmit={this.handleSubmit}/>*/}
        <p>Algorithm components:</p>
        {/*{this.state.algoComponents.map(elem => <WeightRow key={elem} statistic={elem}/>)}*/}
        <div>
          <button onClick={this.handleTest}>Update A-scores</button>
          <input onChange={(e) => this.handleChange(e)}></input>
        </div>
        <XBar multi={this.state.multi}/>
      </div>
    );
  }
}

export default App;
