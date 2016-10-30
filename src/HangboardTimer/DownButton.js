import React, { Component } from "react";

const styles = {
  button: {
    margin: '0 auto',
    borderTop: '0 solid #484D6D',
    borderLeft: '0 solid #484D6D',
    borderBottom: '0 solid #484D6D',
    borderRight: '0 solid #484D6D',
    borderTopWidth: '20px',
    borderLeftWidth: '20px',
    borderRightWidth: '20px',
    borderBottomWidth: '20px',
    background: 'transparent',
    width: '0',
    height: '0',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent'
  }
}

export default class DownButton extends Component {
  render() {
    return (
      <div style={Object.assign(styles.button)} onClick={this.props.handleClick}></div>
    );
  }
}
