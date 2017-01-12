import React, { PureComponent } from "react";
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

export default class IntervalTimer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leadInTime: 0,
      round: 1
    };
  }

  componentWillMount() {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  }

  componentWillUpdate(nextProps, nextState) {
    let vibrate = JSON.parse(localStorage.getItem('vibrate'));
    if (vibrate) {
      this.vibrate(nextProps, nextState);
    }
  }

  vibrate(nextProps, nextState) {
    if ((nextState.hang <= 3 && nextState.currentInterval === 'hang') ||
      (nextState.rest <= 3 && nextState.currentInterval === 'rest') ||
      (nextState.leadInTime && nextState.leadInTime <= 3)
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

    if (nextProps.start) {
      this.startTimer();
    }

    if (!nextProps.start) {
      this.stopTimer();
    }
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
        leadInTime: leadInTime,
        recover: this.props.recover * RECOVERY_MULTIPLIER,
        currentInterval: null
      });
    } else {
      this.setState({
        leadInTime: leadInTime
      });
    }

    this.leadInInterval = rInterval(() => {
      this.setState({
        leadInTime: this.state.leadInTime - 1
      }, () => {
        if (this.state.leadInTime === 0) {
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
    this.clearAnimationFrameInterval(this.hangTimer);
    this.clearAnimationFrameInterval(this.restTimer);
    this.clearAnimationFrameInterval(this.recoveryTimer);
    this.clearAnimationFrameInterval(this.leadInInterval);

    this.setState({
      currentInterval: null,
      leadInTime: 0,
      round: 1
    });

  }

  render() {
    return (
      <div>
        {
          this.props.children({
            started: this.props.start,
            givenTime: this.props[this.state.currentInterval],
            givenReps: this.props.reps,
            completedReps: this.state.reps,
            currentTime: this.state[this.state.currentInterval],
            intervalName: this.state.currentInterval,
            round: this.state.round,
            leadInTime: this.state.leadInTime,
            reps: this.state.reps
          })
        }
      </div>
    );
  }
}
