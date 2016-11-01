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

  stopHangRestTimers() {
    clearInterval(this.hang);
    clearInterval(this.rest);
    this.setState({
      started: false
    })
  }

  intervalOrdering() {
    const ordering = ["hang", "rest"];
    let index = 0;
    let head = ordering[index];
    this.next = function() {
      if (index > ordering.length - 1) {
        index = 0;
      }
      let next = ordering[index];
      index += 1;
      return next;
    }

    return head;
  }

  startHangTimer() {
    const { hang, rest, reps, recover } = this.state.intervals;
    let self = this;

    this.currentInterval = setInterval(function() {
      self.setState({
        currentValue: self.state.intervals[self.state.currentInterval] - 1
      })
    }, 1000);

  }

  persistIntervals(intervals) {
    localStorage.setItem('intervals', JSON.stringify(this.state.intervals));
  }

  incrementInterval(intervalName) {
    let newIntervalState = update(this.state.intervals, {
      [intervalName]: { $apply: function(x) { return x + 1 }}
    });

    let self = this;
    this.tid = setTimeout(function() {
      self.persistIntervals(newIntervalState);
    }, 0);
    clearTimeout(this.tid);

    this.setState({
      intervals: newIntervalState
    });

  }

  decrementInterval(intervalName) {
    if (this.state.intervals[intervalName] <= 0) {
      return;
    }

    let newIntervalState = update(this.state.intervals, {
      [intervalName]: { $apply: function(x) { return x - 1 }}
    });
    let self = this;
    this.tid = setTimeout(function() {
      self.persistIntervals(newIntervalState);
    }, 0);
    clearTimeout(this.tid);

    this.setState({
      intervals: newIntervalState
    });

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
              <h1>{ this.state.currentInterval }</h1>
              <h1>{ this.state.currentValue }</h1>
              <h2>{ this.state.intervals.reps } remaing.</h2>
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
