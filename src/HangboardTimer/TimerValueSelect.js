import React, { Component, PropTypes } from "react";
import { ArrowButton } from "./";

export default class TimerValueSelect extends Component {
  render() {
    const {
      valueName,
      value,
      onIncrement,
      onDecrement,
      timerStarted,
      numberOfSelectors } = this.props;

    const styles = {
      flexGrow: 1
    }
    return(
      <div style={styles} className="col">
        <ArrowButton direction="up" handleClick={ onIncrement } />
        <div style={{ margin: "10px 0"}}>{valueName}</div>
        <div style={{ margin: "10px 0 0 0"}}>{value}</div>
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
