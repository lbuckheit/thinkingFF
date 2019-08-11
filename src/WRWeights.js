import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    //State components:
    //target: a string that contains the value of the statistic that the user wishes to add to the algorithm and diplay on the page
    this.state = {
      target: ''
    }

    //Binding the methods
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //When the user submits, send the current value on state up a level for access by the App component
  handleSubmit(event) {
    event.preventDefault()
    this.props.handleAddCategorySubmit(this.state.target)
  }

  //When the user changes the dropdown, store the currently selected value on state for eventual submission
  handleChange(event) {
    this.setState({ target: event.target.value })
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <h3>Select statistics to include in your algorithm</h3>
        <select onChange={(e) => this.handleChange(e)}>
          <option>Pick a statistic</option>
          {this.props.selectedPositionArr.map(elem => <option key={elem} value={elem}>{elem}</option>)}
        </select>
        <button type='submit'>Add to algorithm</button>
      </form>
    );
  }
}

export default WRWeights;
