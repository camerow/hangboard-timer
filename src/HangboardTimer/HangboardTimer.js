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
    return (
      <div>
        <div className="row">
          {
            this.state.started ?
            null :
            Object.keys(this.state.intervals).map((interval, i) => {
              return (
                <TimerValueSelect
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
        <div className="row">
          <IntervalTimer start={ this.state.started } {...this.state.intervals} />
        </div>
        <div className="row">
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
      recover: recover * 60,
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
    this.restTimer = setInterval(() => {
      if (this.state.rest <= 0) {
        clearInterval(this.restTimer);
        this.setState({
          rest: this.props.rest
        });
        this.startHang();
      } else {
        this.setState({
          rest: this.state.rest - 1
        })
      }
    }, 1000);
  }
  // these should be minutes
  startRecovery() {
    this.recoveryTimer = setInterval(() => {
      if (this.state.recovery <= 0) {
        clearInterval(this.recoveryTimer);
        this.setState({
          recovery: this.props.recovery
        })
      } else {
        this.setState({
          recovery: this.state.recovery - 1
        })
      }
    }, 1000);
  }

  startHang() {
    this.hangTimer = setInterval(() => {
      if (this.state.hang <= 0) {
        clearInterval(this.hangTimer);
        this.setState({
          reps: this.state.reps - 1,
          hang: this.props.hang
        })
        this.startRest();
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
  }

  render() {
    return (
      <div style={{ textAlign: "center", fontSize: "50px"}} className="col-xs-12 col-md-8 col-md-offset-2">
        <div>
          Reps: {this.state.reps}
          <br></br>
          Hang: {this.state.hang}
          <br></br>
          Rest: {this.state.rest}
        </div>
      </div>
    );
  }
}
