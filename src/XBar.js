import React from 'react';
import './App.css';
import * as input from "./initial_data/2018WRsComplete.json"
import { select } from 'd3-selection'
import * as d3 from 'd3'

class XBar extends React.Component {
  constructor(props){
    super(props)
    this.createXBar = this.createXBar.bind(this)
  }

  componentDidMount() {
    this.createXBar()
  }

  componentDidUpdate() {
    this.createXBar()
  }

  createXBar() {
    let WRArr = []
    let WRData = input.default

    //Pushing the objects to an iterable array
    for (let wr of Object.keys(WRData)) {
      WRArr.push(WRData[wr])
    }

    //Filter out players who don't have an ADP because they retired or suck
    WRArr = WRArr.filter(wr => wr.ADP)

    //Sort by whatever you want (in this case, I am sorting by ADP on the y axis, and then the X axis represents the results of your personal algorithm)
    WRArr.sort((a, b) => a.ADP - b.ADP)

    function fantasyPoints(wr) {
      let fpts = Math.floor((wr.receiving_yds * 0.1) + (wr.receiving_tds * 6) + (wr.receiving_rec * 1))
      return fpts > 0 ? fpts : 0
    }

    //Normalize/functionalize the data being graphed
    let normalized = WRArr.map(function(wr) {
      return {...wr, fpts: fantasyPoints(wr)}
    })

    console.log(normalized)

    var div = select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    //Append a series of spans that represent the bars of the chart (SOME WEIRD STUFF HERE WITH BINDING TO SELECTIONS HERE)
    d3.select("body")
      .selectAll("span")
      .data(normalized)
        .enter()
        .append("div")
        .attr('class', 'test')
        .on('mouseover', function(d) {
          div.transition()
              .duration(200)
              .style("opacity", .9);
          div.html(d.name)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
        })
        .style("width", function(d) { return d.fpts + "px"; })
        .text(function(d) { return 'A-score: ' + d.fpts; });
  }

  render() {
    return <div></div>
  }
}

export default XBar;
