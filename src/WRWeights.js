import React from 'react';
import './App.css';

class WRWeights extends React.Component {
  constructor(props) {
    super(props)
    this.QBCats = ['passing_att', 'passing_yds', 'passing_tds', 'passing_int', 'passing_sk']
    this.RBCats = ['rushing_att', 'rushing_yds', 'rushing_tds', 'receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds']
    this.WRCats = ['receiving_rec', 'receiving_tar', 'receiving_tds', 'receiving_yds']
    this.TECats = [...this.WRCats]
    this.catsArr = [this.QBCats, this.RBCats, this.WRCats, this.TECats]
    this.state = {
      target: this.catsArr[this.props.selectedPositionIndex][0],
      selectedPositionArr: this.catsArr[this.props.selectedPositionIndex]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleAddCategorySubmit(this.state.target)
  }

  componentDidUpdate() {
    console.log('inwrweights', this.state.selectedPositionArr)
  }

  handleChange(event) {
    this.setState({ target: event.target.value })
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <h3>Select a statistic to include in your algorithm</h3>
        <select onChange={(e) => this.handleChange(e)}>
          {this.state.selectedPositionArr.map(elem => <option key={elem} value={elem}>{elem}</option>)}
        </select>
        <button type='submit'>Add to algorithm</button>
      </form>
    );
  }
}

export default WRWeights;
