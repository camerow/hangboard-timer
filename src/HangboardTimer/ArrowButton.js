import React, { Component } from "react";

export default class ArrowButton extends Component {
  render() {
    const styles = {
      button: {
        margin: '0 auto',
        borderTop: '0 solid #333',
        borderLeft: '0 solid #333',
        borderBottom: '0 solid #333',
        borderRight: '0 solid #333',
        borderTopWidth: '30px',
        borderLeftWidth: '30px',
        borderRightWidth: '30px',
        borderBottomWidth: '30px',
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
