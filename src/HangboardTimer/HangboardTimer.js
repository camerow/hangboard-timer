import React, { Component } from "react";
import update from "immutability-helper";
import {
  TimerButton,
  TimerValueSelect
} from "./";
import IntervalTimer from "./IntervalTimer";

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
      [intervalName]: { $apply: function(x) {
        return x + 1
      }}
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
    const { started } = this.state;

    const styles = {
      timerContainer: {
         height: '100%',
         display: 'block'
      },
      timerSelect: {
          transition: "all 500ms ease",
          fontSize: "20px",
          maxHeight: (started ? '0' : '30%'),
          textAlign: "center",
          overflow: 'hidden'
        },
        timerDisplay: {
          transition: "all 800ms ease",
          height: (started ? '80%' : '60%')
        },
        timerButtonContainer: {
          position:'fixed',
          bottom:'0px',
          height:'12%',
          width:'100%'
        }
    }


    return (
      <div style={ styles.timerContainer }>
        <div style={ styles.timerSelect } className="row">
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
        <div style={ styles.timerDisplay } className="row">
          <IntervalTimer start={ this.state.started } {...this.state.intervals} />
        </div>
        <div style={ styles.timerButtonContainer } className="row">
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
