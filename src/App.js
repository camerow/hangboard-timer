import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hang: 0,
      rest: 0,
      reps: 0,
      recover: 0,
      started: false
    }
  }

  stopHangRestTimers() {
    clearInterval(this.hang);
    clearInterval(this.rest);

  }

  restTimer(hangSec, restSec) {
    this.rest = setInterval(() => {
      this.setState({ rest: this.state.rest - 1});
      if (this.state.rest < 0 && this.state.reps >= 0) {
        clearInterval(this.rest);
        this.setState({ hang: hangSec, rest: restSec });
        this.hangTimer(hangSec, restSec);
      }
    }, 1000);
  }

  hangTimer(hangSec, restSec) {
    this.hang = setInterval(() => {
      this.setState({ hang: this.state.hang - 1 })
      if (this.state.hang < 0 && this.state.reps >= 0) {
        clearInterval(this.hang);
        this.setState({
          hang: hangSec,
          reps: this.state.reps - 1
        });
        this.restTimer(hangSec, restSec)
      }
      if (this.state.hang < 0) { clearInterval(this.hang) };
      if (this.state.reps === 0) {
        this.setState({ started: false });
        this.stopHangRestTimers();
      }
    }, 1000);
  }

  render() {
    let styles = {
      inputStyles: {
        display: this.state.started ? "none" : ""
      }
    }

    return (
      <div>
        <div style={{color: "red"}}>
          Hang: {this.state.hang}
          <input
            style={styles.inputStyles}
            onChange={(e) => this.setState({hang: e.target.value})} />
        </div>
        <div style={{color: "green"}}>Reps: {this.state.reps}
          <input
            style={styles.inputStyles}
            onChange={(e) => this.setState({reps: e.target.value})} />
        </div>
        <div>
          Rest: {this.state.rest}
          <input
            style={styles.inputStyles}
            onChange={(e) => this.setState({rest: e.target.value})} />
        </div>
        <div>
          Recover: {this.state.recover}
          <input style={styles.inputStyles} onChange={(e) => this.setState({recover: e.target.value})} />
        </div>
        <button
          style={styles.inputStyles}
          onClick={ () => { this.setState({started: true}); this.hangTimer(this.state.hang, this.state.rest) } }>
            Start
          </button>
      </div>
    );
  }
}

export default App;
