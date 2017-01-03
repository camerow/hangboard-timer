import React, { Component } from "react";
import IntervalTimerDisplay from "./IntervalTimerDisplay";
import SequenceMap from 'rebass/dist/SequenceMap';

const RECOVERY_MULTIPLIER = 60;

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
      console.log('vibrate', nextProps);
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

  startRest(referrer) {
    if (referrer) {
      clearInterval(referrer);
    }

    if (this.state.reps === 0) {
      this.startRecovery();
      return;
    }
    else {
      this.setState({
        hang: this.props.hang
      });

      this.restTimer = setInterval(() => {
        if (this.state.rest <= 0) {
          clearInterval(this.restTimer);
          this.startHang(this.restTimer);

        } else {
          this.setState({
            rest: this.state.rest - 1
          });
        }
      }, 1000);
    }
  }

  startRecovery(referrer) {
    if (referrer) {
      clearInterval(referrer);
    }
    this.setState({
      currentInterval: 'recover',
      hang: this.props.hang,
      reps: this.props.reps,
      round: this.state.round + 1
    });

    this.recoveryTimer = setInterval(() => {
      if (this.state.recover <= 0) {

        this.leadIn(5, this.recoveryTimer);
      } else {
        this.setState({
          recover: this.state.recover - 1
        });
      }
    }, 1000);
  }

  leadIn(leadInTime = 5, referrer = false) {
    this.setState({
      readyTimer: leadInTime
    });

    if (referrer) {
      clearInterval(referrer);
      this.setState({
        recover: this.props.recover * RECOVERY_MULTIPLIER,
        currentInterval: null
      });
    }

    this.leadInInterval = setInterval(() => {
      this.setState({
        readyTimer: this.state.readyTimer - 1
      });

      if (this.state.readyTimer === 0) {
        this.startHang(this.leadInInterval);
      }
    }, 1000);

  }

  startHang(referrer) {
    if (referrer) {
      clearInterval(referrer);
    }

    this.setState({
      currentInterval: 'hang',
      rest: this.props.rest
    });

    this.hangTimer = setInterval(() => {
      if (this.state.hang <= 0) {
        this.setState({
          currentInterval: 'rest',
          reps: this.state.reps - 1
        });
        this.startRest(this.hangTimer);

      } else if (this.state.reps > 0) {
        if (this.state.hang <= 3) {
          navigator.vibrate(500);
        }
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

    clearInterval(this.hangTimer);
    clearInterval(this.restTimer);
    clearInterval(this.recoveryTimer);
    clearInterval(this.leadInInterval);
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
