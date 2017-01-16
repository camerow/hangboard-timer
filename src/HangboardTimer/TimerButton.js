import React, { Component } from "react";
import Button from 'rebass/dist/Button';

export default class TimerButtons extends Component {
  render() {
    const styles = {
      button: {
        height: '70px',
        maxWidth: '500px',
        minWidth: '250px',
        fontSize: '32px',
        color: 'white',
        border: 'none',
        borderRadius: '10px'
      }
    };

    const { onStartClick } = this.props;
    return (
      <Button
        style={Object.assign({}, styles.button, this.props.style)}
        theme={ this.props.timerRunning ? 'warning' : 'success'}
        onClick={ onStartClick }>
        {this.props.timerRunning ? "Stop" : "Start"}
      </Button>
    );
  }
}
