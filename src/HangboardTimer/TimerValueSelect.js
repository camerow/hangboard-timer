import React, { Component, PropTypes } from "react";
import { ArrowButton } from "./";

export default class TimerValueSelect extends Component {
  render() {
    const {
      valueName,
      value,
      onIncrement,
      onDecrement
    } = this.props;

    const styles = {
      valueSelectContainer: {
        fontSize: '24px'
      },
      valueName: {
        margin: '10px 0',
        textTransform: 'capitalize'
      },
      value: {
        fontSize: '24px',
        marginBottom: '10px'
      }
    };

    return(
      <div style={ styles.valueSelectContainer } className="col-xs-6 vhs-top">
        <ArrowButton direction="up" handleClick={ onIncrement } />
        <div style={ styles.valueName }>{valueName}</div>
        <div style={ styles.value }>{value} {this.props.timeValue || ''}</div>
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
