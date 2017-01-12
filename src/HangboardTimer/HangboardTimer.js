import React, { Component } from "react";
import update from "immutability-helper";
import {
  TimerButton,
  TimerValueSelect
} from "./";
import IntervalTimer from "./IntervalTimer";
import Section from 'rebass/dist/Section';
import IntervalTimerDisplay from './IntervalTimerDisplay';
import Fixed from 'rebass/dist/Fixed';

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
      started: false,
      vibrate: true
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
      [intervalName]: {
        $apply: function(x) {
          return x + 1
        }
      }
    });

    localStorage.setItem('intervals', JSON.stringify(newIntervalState));

    this.setState({
      intervals: newIntervalState,
      currentValue: newIntervalState['hang']
    });
  }

  decrementInterval(intervalName) {
    if (this.state.intervals[intervalName] <= 0) {
      return;
    }

    let newIntervalState = update(this.state.intervals, {
      [intervalName]: {
        $apply: function(x) {
          return x - 1
        }
      }
    });

    localStorage.setItem('intervals', JSON.stringify(newIntervalState));

    this.setState({
      intervals: newIntervalState
    });

  }

  getTimeValueString(interval) {
    let timeValue;
    switch (interval) {
      case 'recover':
        timeValue = 'min.'
        break;
      case 'hang':
      case 'rest':
        timeValue = 'sec.'
        break;
      default:
        timeValue = ''
    }

    return timeValue;
  }

  render() {
    const { started } = this.state;

    const styles = {
      timerSelect: {
          transition: "all 500ms ease",
          fontSize: "20px",
          textAlign: "center",
          overflow: 'hidden'
        },
        timerDisplay: {
          transition: "all 800ms ease",
          height: (started ? '80%' : '0%')
        }
    }

    let leadInTimer = (round, readyTimer) => {
      const style = {
         textAlign: "center",
         fontSize: "50px",
         marginTop: '100px'
      }
      return (
        <div style={ style } className="vhs-bottom">
          {
            round ?
            <p>Round { round }</p>
            :
            null
          }
          <p>Begin in { readyTimer }</p>
        </div>
      );
    };

    return (
      <div>
      { !this.state.started ?
        <div style={ styles.timerSelect } className="timer-select-row row">
            {
              Object.keys(this.state.intervals).map((interval, i) => {
                let timeValue = this.getTimeValueString(interval);
                return (
                  <TimerValueSelect
                    timeValue={timeValue}
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
            :
            null
          }
        <div  className="row">
        <IntervalTimer vibrate={this.props.shouldVibrate} start={ this.state.started } {...this.state.intervals}>
          {
            ({started, givenTime, givenReps, completedReps, currentTime, intervalName, round, leadInTime}) =>
              (intervalName === null && started) ?
                leadInTimer(round, leadInTime)
                : started ? <IntervalTimerDisplay
                              intervalName={intervalName}
                              duration={givenTime}
                              completedReps={completedReps}
                              givenReps={givenReps}
                              value={currentTime}>
                            </IntervalTimerDisplay>
                : null
          }
        </IntervalTimer>
        </div>
        <Fixed style={{ margin: '24px'}} bottom={true} left={true} right={true}>
          <TimerButton
            timerRunning={ this.state.started }
            onStartClick={ () =>
              this.setState({
                started: !this.state.started
              })} />
        </Fixed>
      </div>
    );
  }
}
