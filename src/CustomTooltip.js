import React from 'react';
import './App.css';

class CustomTooltip extends React.Component {
    constructor(props) {
      super(props)
      console.log(props.data)
    }

    render() {
      const { active } = this.props;
      console.log(this.props)
      console.log('BBBBBB')
      console.log(this.props.payload)

      if (active) {
        const { payload, label } = this.props;
        return (
          <div className="custom-tooltip">
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        );
      }

      return null;
    }
  }

export default CustomTooltip
