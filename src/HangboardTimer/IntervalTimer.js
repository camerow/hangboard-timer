import React, { Component } from "react";
import IntervalTimerDisplay from "./IntervalTimerDisplay";
import SequenceMap from 'rebass/dist/SequenceMap';

const RECOVERY_MULTIPLIER = 60;

let rInterval = function(callback,delay) {
  var dateNow = Date.now,
     requestAnimation = window.requestAnimationFrame,
     start = dateNow(),
     stop,
     intervalFunc = function() {
      dateNow()-start<delay||(start+=delay,callback());
      stop||requestAnimation(intervalFunc)
     }

  requestAnimation(intervalFunc);

  return {
    clear: function() { stop = 1 }
  }
}

export default class IntervalTimer extends Component {
  constructor() {
    super();
    this.state = {
      readyTimer: 0,
      round: 1
    };
  }

  componentWillUpdate(nextProps, nextState) {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (
      (nextState.hang <= 3 && nextState.currentInterval === 'hang') ||
      (nextState.rest <= 3 && nextState.currentInterval === 'rest') ||
      (nextState.readyTimer && nextState.readyTimer <= 3)
      && navigator.vibrate) {
        navigator.vibrate(500);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { recover, ...rest } = nextProps;
    this.setState({
      recover: recover * RECOVERY_MULTIPLIER,
      ...rest
    });

    this.createSteps(nextProps.reps);

    if (nextProps.start) {
      this.startTimer();
    }

    if (!nextProps.start) {
      this.stopTimer();
    }
  }

  createSteps(numOfReps) {
    let repetitions = [];
    for (var i = 1; i <= numOfReps; i++) {
      repetitions.push({
        children: i
      });
    };

    this.setState({
      steps: repetitions
    })
  }

  clearAnimationFrameInterval(interval) {
    if (interval && interval.clear) {
      interval.clear();
    } else if (interval) {
      clearInterval(interval);
    }
  }

  startRest(referrer) {
    if (referrer.clear) {
      referrer.clear();
    } else {
      this.clearAnimationFrameInterval(referrer);
    }

    if (this.state.reps === 0) {
      this.startRecovery();
      return;
    }
    else {
      this.setState({
        hang: this.props.hang
      }, () => {
        this.restTimer = rInterval(() => {
          if (this.state.rest <= 1) {
            this.clearAnimationFrameInterval(this.restTimer);
            this.startHang(this.restTimer);

          } else {
            this.setState({
              rest: this.state.rest - 1
            });
          }
        }, 1000);
      });
    }
  }

  startRecovery(referrer) {
    if (referrer) {
      this.clearAnimationFrameInterval(referrer);
    }

    this.setState({
      currentInterval: 'recover',
      hang: this.props.hang,
      reps: this.props.reps,
      round: this.state.round + 1
    }, () => {
      this.recoveryTimer = rInterval(() => {
        if (this.state.recover <= 1) {

          this.leadIn(5, this.recoveryTimer);
        } else {
          this.setState({
            recover: this.state.recover - 1
          });
        }
      }, 1000);
    });

  }

  leadIn(leadInTime = 5, referrer = false) {
    // If another interval triggered this
    if (referrer) {
      this.clearAnimationFrameInterval(referrer);
      this.setState({
        readyTimer: leadInTime,
        recover: this.props.recover * RECOVERY_MULTIPLIER,
        currentInterval: null
      });
    } else {
      this.setState({
        readyTimer: leadInTime
      });
    }

    this.leadInInterval = rInterval(() => {
      this.setState({
        readyTimer: this.state.readyTimer - 1
      }, () => {
        if (this.state.readyTimer === 0) {
          this.startHang(this.leadInInterval);
        }
      });


    }, 1000);

  }

  startHang(referrer) {
    if (referrer) {
      this.clearAnimationFrameInterval(referrer);
    }

    this.setState({
      currentInterval: 'hang',
      rest: this.props.rest
    });

    this.hangTimer = rInterval(() => {
      if (this.state.hang <= 1) {
        this.setState({
          currentInterval: 'rest',
          reps: this.state.reps - 1
        }, () => {
          this.startRest(this.hangTimer);
        });

      } else if (this.state.reps > 0) {
        this.setState({
          hang: this.state.hang - 1
        })
      } else {
        this.startRecovery(this.hangTimer);
      }
    }, 1000);
  }

  startTimer() {
    this.leadIn();
  }

  stopTimer() {
    this.setState({
      currentInterval: null,
      readyTimer: 0,
      round: 1
    });

    this.clearAnimationFrameInterval(this.hangTimer);
    this.clearAnimationFrameInterval(this.restTimer);
    this.clearAnimationFrameInterval(this.recoveryTimer);
    this.clearAnimationFrameInterval(this.leadInInterval);
  }

  render() {
    const { currentInterval } = this.state;
    const styles = {
      timerDisplayContainer: {
        textAlign: "center",
        fontSize: "50px"
      },
      timerDisplay: {
        transition: "all 500ms ease-in"
      },
      leadInContainer: {
        height: '50%'
      }
    };

    let leadInTimer = (showLeadIn) => {
      let countdownTimer = showLeadIn ?
        <div style={{ marginTop: '100px'}} className="vhs-bottom">
          {
            this.state.round ?
            <p>Round {this.state.round }</p>
            :
            null
          }
          <p>Begin in { this.state.readyTimer }</p>
        </div>
        :
        null
      return countdownTimer;
    };

    return (
      <div style={ styles.timerDisplayContainer } className="col-xs-12 col-md-8 col-md-offset-2">
        {
          currentInterval ?
            <div style={ styles.timerDisplay }>
              <IntervalTimerDisplay
                intervalName={currentInterval}
                duration={this.props[currentInterval]}
                value={this.state[currentInterval]}>
              </IntervalTimerDisplay>
              <SequenceMap
              active={ Math.abs(this.props.reps - this.state.reps) }
              steps={ this.state.steps } />
              {/* <p className="vhs-pop">{this.state.reps}/{this.props.reps} complete</p>*/}
            </div>
            :
            null
        }

        { leadInTimer(this.state.readyTimer) }
      </div>
    );
  }
}
