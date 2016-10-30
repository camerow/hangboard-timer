import React, { Component } from "react";

const styles = {
  button: {
    height: '50px',
    width: '100%',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    start: {
      backgroundColor: '#57a773'
    },
    stop: {
      backgroundColor: '#EE6352'
    }
  }
}

export default class TimerButtons extends Component {
  render() {
    const { onStartClick } = this.props;
    const buttonColor = this.props.timerRunning ? styles.button.stop : styles.button.start;

    return (
      <button style={Object.assign(styles.button, buttonColor)} onClick={ onStartClick }>{this.props.timerRunning ? "Stop" : "Start"}</button>
    );
  }
}
