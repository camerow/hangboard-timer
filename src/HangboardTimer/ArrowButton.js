import React, { Component } from "react";

export default class ArrowButton extends Component {
  render() {
    const color = this.props.color || '#333';
    const size = this.props.size ? this.props.size + 'px' : '30px';

    const styles = {
      button: {
        margin: '0 auto',
        borderTop: `0 solid ${color}`,
        borderLeft: `0 solid ${color}`,
        borderBottom: `0 solid ${color}`,
        borderRight: `0 solid ${color}`,
        borderTopWidth: size,
        borderLeftWidth: size,
        borderRightWidth: size,
        borderBottomWidth: size,
        background: 'transparent',
        width: '0',
        height: '0'
      },
      up: {
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent'
      },
      down: {
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent'
      },
      left: {
        borderLeftColor: 'transparent',
        borderBottomtColor: 'transparent',
        borderTopColor: 'transparent'
      },
      right: {
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent'
      }
    }

    return (
      <div style={Object.assign({}, styles.button, styles[this.props.direction])} onClick={this.props.handleClick}></div>
    );
  }
}
