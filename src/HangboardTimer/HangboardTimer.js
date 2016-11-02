import React, { Component } from "react";
import update from "immutability-helper";
import {
  TimerButton,
  TimerValueSelect
} from "./";

export default class HangboardTimer extends Component {
  constructor() {
    super();
    this.state = {
      intervals: {
        hang: 0,
        rest: 0,
        reps: 0,
        recover: 0
      },
      currentValue: 0,
      currentInterval: 'hang',
      started: false
    }
  }

  componentDidMount() {
    let cachedIntervals = JSON.parse(localStorage.getItem('intervals'));

    if (cachedIntervals) {
      this.setState({
        intervals: cachedIntervals
      });
    }
  }

  incrementInterval(intervalName) {
    let newIntervalState = update(this.state.intervals, {
      [intervalName]: { $apply: function(x) { return x + 1 }}
    });
    localStorage.setItem('intervals', JSON.stringify(newIntervalState));

    this.setState({
      intervals: newIntervalState,
      currentValaue: newIntervalState['hang']
    });

  }

  decrementInterval(intervalName) {
    if (this.state.intervals[intervalName] <= 0) {
      return;
    }

    let newIntervalState = update(this.state.intervals, {
      [intervalName]: { $apply: function(x) { return x - 1 }}
    });

    localStorage.setItem('intervals', JSON.stringify(newIntervalState));

    this.setState({
      intervals: newIntervalState
    });

  }

  render() {
    const styles={
      height: (this.state.started ? '0' : '200px'),
      transition: "all 500ms ease",
      fontSize: "20px",
      height: "20%",
      textAlign: "center"
    }

    return (
      <div style={{ height: '100%'}}>
        <div style={ styles } className="row">
          {
            Object.keys(this.state.intervals).map((interval, i) => {
              return (
                <TimerValueSelect
                  timerStarted={this.state.started}
                  key={interval + i}
                  valueName={interval}
                  value={this.state.intervals[interval]}
                  onIncrement={ () => this.incrementInterval(interval) }
                  onDecrement={ () => this.decrementInterval(interval) }
                />
              );
            })
          }
        </div>
        <div style={{ height: "60%"}} className="row">
          <IntervalTimer start={ this.state.started } {...this.state.intervals} />
        </div>
        <div style={{ display: 'block', height: '20%'}} className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <TimerButton
            timerRunning={ this.state.started }
            onStartClick={ () => { this.setState({ started: !this.state.started })}} />
          </div>
        </div>
      </div>
    );
  }
}

class IntervalTimer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    let { recover, ...rest } = nextProps;

    this.setState({
      recover: recover,
      ...rest
    })

    if (nextProps.start) {
      this.startTimer();
    }

    if (!nextProps.start) {
      this.stopTimer();
    }
  }

  startRest() {
    if (this.state.reps === 0) {
      this.setState({
        currentInterval: 'recover',
        hang: this.props.hang
      });
      this.startRecovery();
    } else {
      this.setState({
        currentInterval: 'rest',
        hang: this.props.hang
      });

      this.restTimer = setInterval(() => {
        if (this.state.rest <= 0) {
          clearInterval(this.restTimer);
          this.startHang();

        } else {
          this.setState({
            rest: this.state.rest - 1
          })
        }
      }, 1000);
    }
  }
  // these should be minutes
  startRecovery() {
    this.setState({
      hang: this.props.hang,
      reps: this.props.reps
    });

    this.recoveryTimer = setInterval(() => {
      if (this.state.recover <= 0) {
        clearInterval(this.recoveryTimer);
        this.setState({
          recover: this.props.recover
        });
        this.startRest();
      } else {
        this.setState({
          recover: this.state.recover - 1
        })
      }
    }, 1000);
  }

  startHang() {
    this.setState({
      currentInterval: 'hang',
      rest: this.props.rest
    });

    this.hangTimer = setInterval(() => {
      if (this.state.hang <= 0) {
        this.setState({
          reps: this.state.reps - 1
        });
        this.startRest();
        clearInterval(this.hangTimer);

      } else if (this.state.reps >= 0) {
        this.setState({
          hang: this.state.hang - 1
        })
      } else {
        this.startRecovery();
      }
    }, 1000);
  }

  startTimer() {
    console.log("START", this.state);
    this.startHang();

  }

  stopTimer() {
    clearInterval(this.hangTimer);
    clearInterval(this.restTimer);
    clearInterval(this.recoveryTimer);
  }

  render() {
    return (
      <div style={{ textAlign: "center", fontSize: "50px"}} className="col-xs-12 col-md-8 col-md-offset-2">
        <div>
        {
          this.state.currentInterval ?
          `${this.state.currentInterval}: ${this.state[this.state.currentInterval]}`
          :
          null
        }
          <br></br>
          Reps: {this.state.reps}
        </div>
      </div>
    );
  }
}
