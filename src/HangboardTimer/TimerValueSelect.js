import React, { Component, PropTypes } from "react";
import { ArrowButton } from "./";

export default class TimerValueSelect extends Component {
  render() {
    const { valueName, value, onIncrement, onDecrement, timerStarted } = this.props;
    const styles = {
      valueName: {
        margin: '10px 0',
        textTransform: 'capitalize'
      },
      value: {
        margin: '10px 0 0 0'
      }
    };

    return(
      <div style={styles} className="col-xs-3">
        <ArrowButton direction="up" handleClick={ onIncrement } />
        <div style={ styles.valueName }>{valueName}</div>
        <div style={ styles.value }>{value}</div>
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
