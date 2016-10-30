import React, { Component, PropTypes } from "react";
import { ArrowButton } from "./";

export default class TimerValueSelect extends Component {
  render() {
    const { valueName, value, onIncrement, onDecrement } = this.props;

    return(
      <div className="col-xs-3">
        <ArrowButton direction="up" handleClick={ onIncrement } />
        <div style={{margin: "10px 0"}}>{valueName}: {value}</div>
        <ArrowButton direction="down" handleClick={ onDecrement } />
      </div>
    );
  }
}

TimerValueSelect.propTypes = {
  valueName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}
