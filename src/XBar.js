import React from 'react';
import {json} from 'd3-fetch';
import './App.css';
import * as input from "./initial_data/2018WRsComplete.json"
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
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
    const node = this.node
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
      let fpts = Math.floor((wr.receiving_yds * 0.001) + (wr.receiving_tds * .006) + (wr.receiving_rec * .001) + (wr.receiving_tar * 2))
      return fpts > 0 ? fpts : 0
    }

    //Normalize/functionalize the data being graphed
    let normalized = WRArr.map(function(wr) {
      return {...wr, fpts: fantasyPoints(wr)}
    })

    var div = select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    //Append a series of divs that represent the bars of the chart
    select("body")
      .selectAll("div")
      .data(normalized)
        .enter()
        .append("div")
        .on('mouseover', function(d) {
          div.transition()
              .duration(200)
              .style("opacity", .9);
          div.html(d.name)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
        })
        .style("width", function(d) { return d.fpts + "px"; })
        .text(function(d) { return d.fpts; });
  }

  render() {
    return <span></span>
  }
}

export default XBar;
