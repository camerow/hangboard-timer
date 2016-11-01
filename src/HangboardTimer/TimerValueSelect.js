import React, { Component, PropTypes } from "react";
import { ArrowButton } from "./";

export default class TimerValueSelect extends Component {
  render() {
    const { valueName, value, onIncrement, onDecrement } = this.props;

    return(
      <div style={{ fontSize: "20px", textAlign: "center"}} className="col-xs-3">
        <ArrowButton direction="up" handleClick={ onIncrement } />
        <div className="row" style={{ margin: "10px 0"}}>{valueName}</div>
        <div className="row" style={{ margin: "10px 0 0 0"}}>{value}</div>
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
