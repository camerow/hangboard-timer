import React, { Component } from 'react';
import SequenceMap from 'rebass/dist/SequenceMap';

export default class IntervalTimerDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeAnimation: false,
      currentInterval: props.intervalName,
      duration: props.duration
    }
  }

  stopAnimation(incomingValue) {
    if (incomingValue === 0) {
      this.setState({
        removeAnimation: true
      })
    } else {
      this.setState({
        removeAnimation: false
      })
    }
  }

  componentDidMount() {
    let repetitions = [];
    for (var i = 1; i <= this.props.givenReps; i++) {
      repetitions.push({
        children: i
      });
    };

    this.setState({
      steps: repetitions
    });


  }

  componentWillReceiveProps(nextProps) {
    const { value, intervalName, duration } = nextProps;

    this.stopAnimation(nextProps.value);
    if (intervalName !== this.state.currentInterval) {
      this.setState({
        currentInterval: intervalName,
        duration
      })
    }
  }

  render() {
    const { fill, outerStroke, strokeWidth, value, intervalName } = this.props;
    const { duration } = this.state;
    const styles = {
      timerDisplayContainer: {
        textAlign: "center",
        fontSize: "50px"
      },
      leadInContainer: {
        height: '75%'
      }
    };
    return (
      <div style={ styles.timerDisplayContainer } className="col-xs-12 col-md-8 col-md-offset-2 vhs-fade">
        <svg className="timer-display" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" preserveAspectRatio="none">
            <circle
              cx="50"
              cy="150"
              r="57"
              id="green-halo"
              fill={fill || "none"}
              stroke={outerStroke || "rgba(97,204,112,0.16)"}
              strokeWidth={strokeWidth || 115}
              strokeDasharray="0,20000"
              transform="rotate(-90,100,100)">
            </circle>
            <circle
            cx="50"
            cy="150"
            r="115"
            fill="none"
            stroke="rgba(97,204,112,1)"
            strokeWidth="5"
            transform="rotate(-90,100,100)" />
            <text
              id="myTimer"
              textAnchor="middle"
              x="150"
              y="190"
              style={{fontSize: "48px"}}>
                {value || 0}
            </text>
            <text
              textAnchor="middle"
              x="150"
              y="130"
              style={{fontSize: "48px", textTransform: 'capitalize'}}>
                {intervalName || ''}
            </text>
        </svg>
        <SequenceMap
        active={ Math.abs(this.props.givenReps - this.props.completedReps) }
        steps={ this.state.steps } />
      </div>

    );
  }
}

IntervalTimerDisplay.propTypes = {
  value: React.PropTypes.number,
  duration: React.PropTypes.number,
  intervalName: React.PropTypes.string
};
