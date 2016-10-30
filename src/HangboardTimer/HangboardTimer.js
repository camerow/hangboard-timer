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
      started: false,
      watchInterval: "hang"
    }
  }

  stopHangRestTimers() {
    clearInterval(this.hang);
    clearInterval(this.rest);
    this.setState({
      started: false
    })
  }

  startRestTimer(hangSec, restSec) {
    let { rest, reps } = this.state.intervals;

    this.rest = setInterval(() => {
      this.setState({
        intervals: {
          rest: this.state.rest - 1
        }
      });

      if (rest < 0 && reps >= 0) {
        clearInterval(this.rest);
        this.setState({
          intervals: {
            hang: hangSec,
            rest: restSec
          }
        });
        this.startHangTimer(hangSec, restSec);
      }
    }, 1000);
  }

  startHangTimer(hangSec, restSec) {
    let { hang, reps } = this.state.intervals;

    this.setState({
      started: true
    });

    this.hang = setInterval(() => {
      this.setState({
        intervals: {
          hang: this.state.hang - 1
        }
      })
      
      if (hang < 0 && reps >= 0) {
        clearInterval(this.hang);

        this.setState({
          intervals: {
            hang: hangSec,
            reps: reps - 1
          }
        });

        this.startRestTimer(hangSec, restSec)

      }
      if (hang < 0) {
        clearInterval(this.hang)
      };

      if (reps === 0) {
        this.setState({
          started: false
        });
        this.stopHangRestTimers();
      }
    }, 1000);
  }

  incrementInterval(intervalName) {
    let newIntervalState = update(this.state.intervals, {
      [intervalName]: { $apply: function(x) { return x + 1 }}
    });

    this.setState({
      intervals: newIntervalState
    })
  }

  decrementInterval(intervalName) {
    if (this.state.intervals[intervalName] <= 0) {
      return;
    }

    let newIntervalState = update(this.state.intervals, {
      [intervalName]: { $apply: function(x) { return x - 1 }}
    });

    this.setState({
      intervals: newIntervalState
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          {
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
          <div>
            <div style={{ textAlign: "center"}} className="col-xs-12 col-md-8 col-md-offset-2">
              <h1>{this.state.intervals[this.state.watchInterval]}</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <TimerButton
            timerRunning={ this.state.started }
            onStartClick={ () => this.startHangTimer(this.state.intervals.hang, this.state.intervals.rest) } />
          </div>
        </div>
      </div>
    );
  }
}
