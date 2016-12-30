import React, { Component } from "react";
import IntervalTimerDisplay from "./IntervalTimerDisplay";

export default class IntervalTimer extends Component {
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

  startRest(referrer) {
    if (referrer) {
      clearInterval(referrer);
    }

    if (this.state.reps === 0) {
      this.startRecovery();
      return;
    } else {
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
          })
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
      reps: this.props.reps
    });

    this.recoveryTimer = setInterval(() => {
      if (this.state.recover <= 0) {
        this.setState({
          recover: this.props.recover * 60
        });
        this.startRest(this.recoveryTimer);
      } else {
        this.setState({
          recover: this.state.recover - 1
        })
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
        this.setState({
          hang: this.state.hang - 1
        })
      } else {
        this.startRecovery(this.hangTimer);
      }
    }, 1000);
  }

  startTimer() {
    this.startHang();
  }

  stopTimer() {
    this.setState({
      currentInterval: null
    });
    clearInterval(this.hangTimer);
    clearInterval(this.restTimer);
    clearInterval(this.recoveryTimer);
  }

  render() {
    const styles = {
      transition: "all 500ms ease"
    }
    console.log("duration", this.props[this.state.currentInterval], this.state.currentInterval);
    return (
      <div style={{ textAlign: "center", fontSize: "50px"}} className="col">
        <div>
        {
          this.state.currentInterval ?
          <IntervalTimerDisplay
            style={{ styles }}
            intervalName={this.state.currentInterval}
            duration={this.props[this.state.currentInterval]}
            value={this.state[this.state.currentInterval]}>
          </IntervalTimerDisplay>
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
