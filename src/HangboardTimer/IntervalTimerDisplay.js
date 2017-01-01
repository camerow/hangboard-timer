import React, { Component } from 'react';

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
    console.log('dur', duration, this.animatedNode);
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" preserveAspectRatio="none" style={{width:300, height:300, top:0, left:0}}>
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
            {
              true ?
              // this.state.removeAnimation ?
              <stop></stop>
              :
              <animate
                fill="freeze"
                ref={(animatedNode) => { this.animatedNode = animatedNode }}
                attributeName="stroke-dasharray"
                from="0"
                to="360"
                dur={duration + 's'}
                repeatCount="indefinite">
              </animate>
            }
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
    );
  }
}

IntervalTimerDisplay.propTypes = {
  value: React.PropTypes.number,
  duration: React.PropTypes.number,
  intervalName: React.PropTypes.string
};
