import React, { Component } from "react";

export default class TimerButtons extends Component {
  render() {
    const styles = {
      button: {
        height: '70px',
        width: '100%',
        fontSize: '36px',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: this.props.timerRunning ? '#EE6352' : '#57a773'
      }
    }

    const { onStartClick } = this.props;

    return (
      <button style={Object.assign({}, styles.button, this.props.style)}
              onClick={ onStartClick }>{this.props.timerRunning ? "Stop" : "Start"}
      </button>
    );
  }
}
