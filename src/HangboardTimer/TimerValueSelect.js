import React, { Component, PropTypes } from "react";
import { ArrowButton } from "./";

export default class TimerValueSelect extends Component {
  render() {
    const { valueName, value, onIncrement, onDecrement, timerStarted } = this.props;
    const styles={
      visibility: (timerStarted ? "hidden" : "visible"),
      opacity: (timerStarted ? '0' : '1'),
      transition: 'all 1s ease'
    }
    return(
      <div style={styles} className="col-xs-3">
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
